import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
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
    id: integer("id").primaryKey({ autoIncrement: true }),
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

export const chats = sqliteTable("chats", {
    id: integer("id").primaryKey(),
    title: text("title"),
    history: text("history")
})