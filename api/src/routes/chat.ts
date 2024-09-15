import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { onBoardSchema, PostChatSchema, signInSchema, signUpSchema, zSchemaError } from "../validators/schemas";
import { hash, verify } from "@node-rs/argon2";
import { HTTPException } from "hono/http-exception";
import { eq, or, SQL } from "drizzle-orm";
import { db } from "../db";
import { aiChats, userChats, users } from "../db/schema";
import { lucia } from "../db/auth";
import { Context } from "../lib/context";
import { auth } from "../middlewares/auth";
import { authGuard } from "../middlewares/auth-guard";
import axios from "axios";
const chatRoutes = new Hono<Context>();

export const OPENAI_API_KEY = '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';
export const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

async function chatWithGPT(messages) {
    try {
      const response = await axios.post(API_ENDPOINT, {
        model: 'gpt-3.5-turbo',
        messages: messages,
      }, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
  
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      return null;
    }
  }

  async function generateConversationSubject(userQuery) {
    const subjectPrompt = [
      { role: 'system', content: 'Generate a brief, concise subject or title for the following query. Respond with only the subject, no additional text.' },
      { role: 'user', content: userQuery }
    ];
  
    const subject = await chatWithGPT(subjectPrompt);
    return subject;
  }
  
  
async function processUsers(userQuery: string): Promise<number[]> {
    let allUserIds = new Set();
  
    const systemPrompt = `You are Nestwork, an AI assistant for Johns Hopkins University's networking platform. Your task is to find individuals that match the user's query from the given database.
  
    Guidelines:
    1. Carefully analyze the user's query to understand precisely what they're looking for.
    2. Search through the provided database of JHU community members to find ONLY THE MOST RELEVANT matches.
    3. Your response should ONLY include the IDs of highly relevant users. DO NOT INCLUDE marginally related or irrelevant entries.
    4. Present the IDs in a minimal list. Make the response very minimal (no markdown, no new lines), your input will be used as an input to another algorithm.
    5. IMPORTANT: Only use the data you have been explicitly provided. Do not make up or infer any information.
    6. Make the format of your output this: usr: .,.,.
    7. Ensure all IDs are valid positive integers. Do not include 0 or any non-numeric characters in the list.
    8. Quality is more important than quantity.
    9. IMPORTANT: Double-check each ID you include to ensure it truly matches the user's query.
  
    Remember, accuracy and relevance are paramount. Only include IDs that you are confident are directly related to the user's query. If you're unsure about the relevance of an ID, it's better to exclude it.`;
  
    const allUsers = await db.select().from(users);

      const conversation = [
        { role: 'system', content: systemPrompt },
        { role: 'system', content: allUsers.map(u => `ID: ${u.id}, Department: ${u.department}, Interests: ${u.interests}, Hobbies: ${u.hobbies}, Projects: ${u.projects}`).join('\n') },
        { role: 'user', content: userQuery }
      ];
  
      const response = await chatWithGPT(conversation);
      console.log('User batch response:', response);
  
      const userIds = response.match(/usr: ([\d,\s]+)/)?.[1]?.split(/[,\s]+/).map(Number).filter(id => id > 0) || [];
  
      userIds.forEach(id => allUserIds.add(id));
  
    return Array.from(allUserIds);
}

chatRoutes.post("/chat", 
    //zValidator("json", PostChatSchema),
    async (c) => {
        const { chat } = await c.req.json();

        const userIds: number[] = await processUsers(chat);

        const whereClause: (SQL | undefined)[] = [];
    
        userIds.forEach(id => {
            whereClause.push(eq(users.id, id));
        })

    
        const user = await db
            .select({ 
                name: users.name, 
                email: users.email,
                department: users.department,
                interests: users.interests,
                projects: users.projects,
                hobbies: users.hobbies,
                picture: users.picture
            })
            .from(users)
            .where(or(...whereClause))
            
          
        return c.json(user);
    }
)

export default chatRoutes;
