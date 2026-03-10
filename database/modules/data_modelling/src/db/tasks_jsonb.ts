import { pool } from "./db.js"

export async function addMetadataColumn() {
  await pool.query(`
    ALTER TABLE tasks
    ADD COLUMN IF NOT EXISTS metadata JSONB
  `)
}


export async function addTaskMetadata(taskId: number) {
  await pool.query(
    `
    UPDATE tasks
    SET metadata = $1
    WHERE id = $2
    `,
    [
      {
        priority: "high",
        tags: ["important"],
        due_date: "2024-01-15"
      },
      taskId
    ]
  )
}

export async function getHighPriorityTasks() {
  const result = await pool.query(`
    SELECT id,title,metadata
    FROM tasks
    WHERE metadata->>'priority' = 'high'
  `)

  return result.rows
}


export async function addCompletionTime(taskId: number) {
  await pool.query(
    `
    UPDATE tasks
    SET metadata = metadata || $1
    WHERE id = $2
    `,
    [
      { completed_at: new Date().toISOString() },
      taskId
    ]
  )
}


export async function createMetadataIndex() {
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_tasks_metadata
    ON tasks USING GIN(metadata)
  `)
}