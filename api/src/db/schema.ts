import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").notNull().primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email"),
  department: text("department"),
  interests: text("interests"),
  projects: text("projects"),
  hobbies: text("hobbies"),
  username: text("username").notNull().unique(),
  picture: text("picture"),
  password_hash: text("password").notNull(),
});

export const groups = sqliteTable("groups", {
    id: integer("id").unique().primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    focus: text("focus"),
    email: text("email"),
    activities: text("activities"),
  });

export const sessions = sqliteTable("sessions", {
  id: text("id").notNull().primaryKey(), // must be a string for Lucia Auth
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at").notNull(),
});

export const conversations = sqliteTable("conversations", {
  id: integer("id").notNull().unique().primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(()=> users.id),
  title: text("title")
})

export const userChats = sqliteTable("user_chats", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    content: text("content"),
    conversationId: integer("conversation_id")
      .notNull()
      .references(() => conversations.id)
})


export const userAiChatRelations = sqliteTable("user_ai_chat_relations", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    aiChatId: integer("ai_chat_id")
      .notNull()
      .references(() => aiChats.id),
    userId: integer("user_id")
      .notNull()
      .references(()=> users.id)
})

export const aiChats = sqliteTable("ai_chats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  conversationId: integer("conversation_id")
    .notNull()
    .references(() => conversations.id),
  
})

