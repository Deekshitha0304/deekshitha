import fs from "fs-extra";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

fs.ensureDirSync(".data");

const sqlite = new Database(".data/app.db");
const db = drizzle(sqlite);

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  age: integer("age"),
});

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    age INTEGER
  );
`);

await db.insert(users).values({
  id: "u1",
  name: "Deekshi",
  age: 22,
});

await db.insert(users).values({
  id: "u2",
  name: "Ada",
  age: 30,
});

console.log("Inserted users");

const rows = await db.select().from(users);

console.log("Users from DB:");
console.log(rows);