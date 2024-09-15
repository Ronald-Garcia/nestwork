import { hash } from "@node-rs/argon2";
import { db, connection } from "./index";
import { groups, sessions, users } from "./schema";
import { faker } from "@faker-js/faker";
import { sql } from "drizzle-orm";
import { hashOptions } from "../routes/auth";

async function seed() {
  console.log("Seeding the database...");

  // Clean the tables
  console.log("Cleaning existing data...");
  await db.delete(sessions);
  await db.delete(users);
  await db.delete(groups);

  // Reset the auto-increment counters
  await db.run(
    sql`DELETE FROM sqlite_sequence WHERE name IN ('groups', 'users')`,
  );

  const sampleInterests = [
    "Quantum Computing",
    "AI",
    "design",
    "development",
    "programming",
    "software",
    "hardware",
    "AI",
    "machine learning",
    "data science",
    "cloud computing",
    "cybersecurity",
  ];

  const sampleDepartments = [
    "ECE",
    "Physics",
    "Writing Sems",
    "Gender Studies",
    "Meche",
    "Math",
  ];
  const sampleProjects = [
    "Nestworks",
    "ChatGPT",
    "DARPAs",
    "Missiles",
    "Rockets",
    "Killing innocent civilians :D",
  ];
  console.log("Inserting new seed data...");

  const sampleUsers = [];
  for (let i = 1; i <= 10; i++) {
    const user = await db
      .insert(users)
      .values({
        name: faker.person.fullName(),
        username: `user-${i}`,
        password_hash: await hash(`pass-${i}`, hashOptions),
        department: faker.helpers.arrayElement(sampleDepartments),
        interests: faker.helpers.arrayElements(sampleInterests, {
            min: 1,
            max: 3
        }).join(" "),
        projects: faker.helpers.arrayElements(sampleProjects, {
            min: 1,
            max: 3
        }).join(" "),
        email: faker.person.middleName()

      })
      .returning()
      .get();

    sampleUsers.push(user);
  }

  console.log("Seeding completed successfully.");
}

seed()
  .catch((e) => {
    console.error("Seeding failed:");
    console.error(e);
  })
  .finally(() => {
    connection.close();
  });
