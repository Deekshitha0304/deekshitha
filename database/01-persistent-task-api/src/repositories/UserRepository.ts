import { pool } from "../database.js"
import { User } from "../types.js"

export async function createUser(email: string): Promise<User> {
  const result = await pool.query(
    `INSERT INTO users (email)
     VALUES ($1)
     RETURNING *`,
    [email]
  )

  return result.rows[0]
}

export async function getUserById(id: number): Promise<User | null> {
  const result = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  )

  return result.rows[0] || null
}