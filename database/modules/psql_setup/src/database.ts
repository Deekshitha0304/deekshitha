import { Pool } from "pg"                                   // pool reuses connections

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "taskapp",
  max: 10,
})

pool.on("connect", () => {
  console.log("Connected to PostgreSQL")
})

pool.on("error", (err) => {
  console.error("Unexpected database error", err)
})