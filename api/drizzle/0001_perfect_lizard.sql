CREATE TABLE `groups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`focus` text,
	`email` text,
	`activities` text
);
--> statement-breakpoint
DROP TABLE `comments`;--> statement-breakpoint
DROP TABLE `posts`;--> statement-breakpoint
ALTER TABLE `users` ADD `email` text;--> statement-breakpoint
ALTER TABLE `users` ADD `department` text;--> statement-breakpoint
ALTER TABLE `users` ADD `interests` text;--> statement-breakpoint
ALTER TABLE `users` ADD `projects` text;--> statement-breakpoint
ALTER TABLE `users` ADD `hobbies` text;--> statement-breakpoint
ALTER TABLE `users` ADD `picture` text;