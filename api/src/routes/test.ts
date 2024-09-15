const axios = require('axios');
const readline = require('readline');
const { getAllData } = require('./database');

const OPENAI_API_KEY = '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';
const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function processUsers(users, userQuery, batchSize = 60) {
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

  for (let i = 0; i < users.length; i += batchSize) {
    const userBatch = users.slice(i, i + batchSize);

    const batchData = `
      Users:
      ${userBatch.map(u => `ID: ${u.id}, Name: ${u.name}, Department: ${u.department}, Interests: ${u.interests}, Projects: ${u.projects}, Hobbies: ${u.hobbies}`).join('\n')}
    `;

    const conversation = [
      { role: 'system', content: systemPrompt },
      { role: 'system', content: batchData },
      { role: 'user', content: userQuery }
    ];

    const response = await chatWithGPT(conversation);
    console.log('User batch response:', response);

    const userIds = response.match(/usr: ([\d,\s]+)/)?.[1]?.split(/[,\s]+/).map(Number).filter(id => id > 0) || [];

    userIds.forEach(id => allUserIds.add(id));
  }

  return Array.from(allUserIds);
}

async function processGroups(groups, userQuery, batchSize = 60) {
  let allGroupIds = new Set();

  const systemPrompt = `You are Nestwork, an AI assistant for Johns Hopkins University's networking platform. Your task is to find groups that match the user's query from the given database.

  Guidelines:
  1. Carefully analyze the user's query to understand precisely what they're looking for.
  2. Search through the provided database of JHU groups to find ONLY THE MOST RELEVANT matches.
  3. Your response should ONLY include the IDs of highly relevant groups. DO NOT INCLUDE marginally related or irrelevant entries.
  4. Present the IDs in a minimal list. Make the response very minimal (no markdown, no new lines), your input will be used as an input to another algorithm.
  5. IMPORTANT: Only use the data you have been explicitly provided. Do not make up or infer any information.
  6. Make the format of your output this: grp: .,.,.
  7. Ensure all IDs are valid positive integers. Do not include 0 or any non-numeric characters in the list.
  8. Quality is more important than quantity.
  9. IMPORTANT: Double-check each ID you include to ensure it truly matches the user's query.

  Remember, accuracy and relevance are paramount. Only include IDs that you are confident are directly related to the user's query. If you're unsure about the relevance of an ID, it's better to exclude it.`;

  for (let i = 0; i < groups.length; i += batchSize) {
    const groupBatch = groups.slice(i, i + batchSize);

    const batchData = `
      Groups:
      ${groupBatch.map(g => `ID: ${g.id}, Name: ${g.name}, Focus: ${g.focus}, Activities: ${g.activities}`).join('\n')}
    `;

    const conversation = [
      { role: 'system', content: systemPrompt },
      { role: 'system', content: batchData },
      { role: 'user', content: userQuery }
    ];

    const response = await chatWithGPT(conversation);
    console.log('Group batch response:', response);

    const groupIds = response.match(/grp: ([\d,\s]+)/)?.[1]?.split(/[,\s]+/).map(Number).filter(id => id > 0) || [];

    groupIds.forEach(id => allGroupIds.add(id));
  }

  return Array.from(allGroupIds);
}

async function processDataInBatches(data, userQuery) {
  const userIds = await processUsers(data.users, userQuery);
  const groupIds = await processGroups(data.groups, userQuery);

  return { userIds, groupIds };
}

function printUserDetails(user) {
  console.log(`\nUser ID: ${user.id}`);
  console.log(`Name: ${user.name}`);
  console.log(`Department: ${user.department}`);
  console.log(`Interests: ${user.interests}`);
  console.log(`Projects: ${user.projects}`);
  console.log(`Hobbies: ${user.hobbies}`);
}

function printGroupDetails(group) {
  console.log(`\nGroup ID: ${group.id}`);
  console.log(`Name: ${group.name}`);
  console.log(`Focus: ${group.focus}`);
  console.log(`Activities: ${group.activities}`);
}

async function main() {
  try {
    const data = await new Promise((resolve, reject) => {
      getAllData((err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    console.log("Chat with the AI assistant. Type 'exit' to end the conversation.");

    while (true) {
      const userInput = await askQuestion("You: ");

      if (userInput.toLowerCase() === 'exit') {
        break;
      }

      const { userIds, groupIds } = await processDataInBatches(data, userInput);

      console.log('\nRelevant Users:');
      userIds.forEach(id => {
        const user = data.users.find(u => u.id === id);
        if (user) {
          printUserDetails(user);
        }
      });

      console.log('\nRelevant Groups:');
      groupIds.forEach(id => {
        const group = data.groups.find(g => g.id === id);
        if (group) {
          printGroupDetails(group);
        }
      });
    }

    console.log("Conversation ended. Goodbye!");
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    rl.close();
  }
}

main();