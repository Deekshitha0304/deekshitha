import Database from "better-sqlite3";

const db = new Database("users.db");

export default db;

process.on("exit", () => {
  db.close();
});