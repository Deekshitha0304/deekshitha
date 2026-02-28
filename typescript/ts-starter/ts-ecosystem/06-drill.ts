import fs from "fs-extra";
import { parse } from "csv-parse/sync";
import pino from "pino";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Logger
const log = pino({ level: "info" });

// Ensure .data exists
fs.ensureDirSync(".data");

// Setup SQLite
const sqlite = new Database(".data/app.db");
const db = drizzle(sqlite);

// Define users table
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  age: integer("age"),
});

// Read CSV file
const csvText = fs.readFileSync(".data/users.csv", "utf-8");

type CsvUser = {
  id: string;
  name: string;
  age: string;
};

const records: CsvUser[] = parse(csvText, {  columns: true,
  skip_empty_lines: true,
});

// Insert into DB
for (const row of records) {
  try {
    await db.insert(users).values({
      id: row.id,
      name: row.name,
      age: Number(row.age),
    });

    log.info({ user: row.id }, "Inserted user");
  } catch (error) {
    log.error({ user: row.id }, "Failed to insert user (maybe duplicate)");
  }
}

// Query all users
const allUsers = await db.select().from(users);

log.info({ count: allUsers.length }, "Total users in database");
console.log(allUsers);