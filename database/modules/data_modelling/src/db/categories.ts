import { pool } from "./db.js"

export async function createCategoriesTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE,
      color TEXT
    )
  `)
}

export async function insertCategories() {
  await pool.query(`
    INSERT INTO categories (name, color)
    VALUES 
      ('Work','blue'),
      ('Personal','green'),
      ('Shopping','orange')
    ON CONFLICT (name) DO NOTHING
  `)
}