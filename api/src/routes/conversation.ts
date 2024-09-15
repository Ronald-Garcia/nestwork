import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { onBoardSchema, PostChatSchema, signInSchema, signUpSchema, zSchemaError } from "../validators/schemas";
import { hash, verify } from "@node-rs/argon2";
import { HTTPException } from "hono/http-exception";
import { eq, or, SQL } from "drizzle-orm";
import { db } from "../db";
import { aiChats, conversations, userChats, users } from "../db/schema";
import { lucia } from "../db/auth";
import { Context } from "../lib/context";
import { auth } from "../middlewares/auth";
import { authGuard } from "../middlewares/auth-guard";
import axios from "axios";
import { API_ENDPOINT, OPENAI_API_KEY } from "./chat";
const conversationRoutes = new Hono<Context>();


conversationRoutes.get("/conversation", 
    //zValidator("json", PostChatSchema),
    authGuard,
    async (c) => {
        const user = c.get("user");
        const convos = await db
            .select()
            .from(conversations)
            .where(eq(conversations.userId, user!.id))
            
          
        return c.json(convos);
    }
)

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
conversationRoutes.post("/conversation", 
    authGuard,
    async (c) => {
        const user = c.get('user');
        const { content } = await c.req.json();
        console.log("Adding new conversation")
        const title = await generateConversationSubject(content);
        console.log(title);
        console.log(user!.id);
        const newConvo  = await db
            .insert(conversations)
            .values({ title, userId: user!.id }).returning().get();
        return c.json(newConvo);
    }
)

export default conversationRoutes;
