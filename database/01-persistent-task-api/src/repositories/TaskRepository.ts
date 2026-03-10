import { pool } from "../database.js"
import { Task } from "../types.js"

export async function createTask(
  userId: number,
  title: string
): Promise<Task> {

  const result = await pool.query(
    `INSERT INTO tasks (user_id, title)
     VALUES ($1, $2)
     RETURNING *`,
    [userId, title]
  )

  return result.rows[0]
}

export async function getUserTasks(userId: number): Promise<Task[]> {

  const result = await pool.query(
    `SELECT * FROM tasks
     WHERE user_id = $1`,
    [userId]
  )

  return result.rows
}

export async function completeTask(taskId: number): Promise<Task> {

  const result = await pool.query(
    `UPDATE tasks
     SET completed = true
     WHERE id = $1
     RETURNING *`,
    [taskId]
  )

  return result.rows[0]
}