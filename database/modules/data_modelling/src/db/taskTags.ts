import { pool } from "./db.js"

export async function createTaskTagsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS task_tags (
      task_id INTEGER REFERENCES tasks(id),
      tag_id INTEGER REFERENCES tags(id),
      PRIMARY KEY (task_id, tag_id)
    )
  `)
}

export async function assignTag(taskId: number, tagId: number) {
  await pool.query(
    `INSERT INTO task_tags (task_id, tag_id)
     VALUES ($1,$2)
     ON CONFLICT DO NOTHING`,
    [taskId, tagId]
  )
}

export async function getTasksWithTags() {
  const result = await pool.query(`
    SELECT 
      t.title,
      tg.name AS tag
    FROM tasks t
    JOIN task_tags tt ON t.id = tt.task_id
    JOIN tags tg ON tg.id = tt.tag_id
  `)

  return result.rows
}