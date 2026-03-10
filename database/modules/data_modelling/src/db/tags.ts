import { pool } from "./db.js"

export async function createTagsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tags (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE
    )
  `)
}

export async function insertTags() {
  await pool.query(`
    INSERT INTO tags (name)
    VALUES ('urgent'), ('home'), ('office')
    ON CONFLICT (name) DO NOTHING
  `)
}