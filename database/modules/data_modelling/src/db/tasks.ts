import { pool } from "./db.js"

export async function addCategoryColumn() {
  await pool.query(`
    ALTER TABLE tasks
    ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES categories(id)
  `)
}

export async function assignCategory(taskTitle: string, categoryId: number) {
  const result = await pool.query(
    `UPDATE tasks 
     SET category_id = $1
     WHERE title = $2
     RETURNING *`,
    [categoryId, taskTitle]
  )

  return result.rows
}

export async function getTasksGroupedByCategory() {
  const result = await pool.query(`
    SELECT c.name, COUNT(t.id) AS task_count
    FROM categories c
    LEFT JOIN tasks t
    ON c.id = t.category_id
    GROUP BY c.name
  `)

  return result.rows
}