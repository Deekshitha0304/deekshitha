import { type TaskSnapshotRecord, getTaskDatabase, syncTasksToJson } from "./db"

export interface TaskRecord {
  id: string
  title: string
  description: string
  year: number
  completed: boolean
  priority: "low" | "medium" | "high"
  createdAt: string
  updatedAt: string
}

interface TaskRow {
  id: string
  title: string
  description: string
  year: number
  completed: number
  priority: "low" | "medium" | "high"
  createdAt: string
  updatedAt: string
}

const INITIAL_TASKS: TaskRecord[] = [
  {
    id: "1",
    title: "Learn Next.js Routing",
    description: "Understand file-based routing",
    year: 2024,
    completed: false,
    priority: "medium",
    createdAt: "2026-03-10T09:00:00.000Z",
    updatedAt: "2026-03-12T11:30:00.000Z",
  },
  {
    id: "2",
    title: "Build Task UI",
    description: "Create components and forms",
    year: 2024,
    completed: true,
    priority: "high",
    createdAt: "2026-03-08T14:15:00.000Z",
    updatedAt: "2026-03-13T08:45:00.000Z",
  },
]

declare global {
  var __taskNotesStoreInitialized__: boolean | undefined
}

function toTaskRecord(row: TaskRow): TaskRecord {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    year: row.year,
    completed: Boolean(row.completed),
    priority: row.priority,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }
}

function toTaskSnapshot(records: TaskRecord[]): TaskSnapshotRecord[] {
  return records.map(task => ({ ...task }))
}

function queryAllTasks(): TaskRecord[] {
  const db = getTaskDatabase()
  const rows = db
    .prepare(
      `
      SELECT id, title, description, year, completed, priority, createdAt, updatedAt
      FROM tasks
      ORDER BY datetime(createdAt) ASC, rowid ASC
      `
    )
    .all() as TaskRow[]

  return rows.map(toTaskRecord)
}

function syncMirrorFile() {
  syncTasksToJson(toTaskSnapshot(queryAllTasks()))
}

function ensureStoreInitialized() {
  if (globalThis.__taskNotesStoreInitialized__) {
    return
  }

  const db = getTaskDatabase()
  const result = db.prepare("SELECT COUNT(*) as count FROM tasks").get() as { count: number }

  if (result.count === 0) {
    const insertTask = db.prepare(`
      INSERT INTO tasks (id, title, description, year, completed, priority, createdAt, updatedAt)
      VALUES (@id, @title, @description, @year, @completed, @priority, @createdAt, @updatedAt)
    `)

    const insertInitialTasks = db.transaction((tasks: TaskRecord[]) => {
      for (const task of tasks) {
        insertTask.run({
          id: task.id,
          title: task.title,
          description: task.description,
          year: task.year,
          completed: task.completed ? 1 : 0,
          priority: task.priority,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        })
      }
    })

    insertInitialTasks(INITIAL_TASKS)
  }

  syncMirrorFile()
  globalThis.__taskNotesStoreInitialized__ = true
}

function getTaskStore(): TaskRecord[] {
  ensureStoreInitialized()
  return queryAllTasks()
}

export function getTasks(): TaskRecord[] {
  return getTaskStore()
}

export function getTaskById(id: string): TaskRecord | null {
  ensureStoreInitialized()
  const db = getTaskDatabase()
  const row = db
    .prepare(
      `
      SELECT id, title, description, year, completed, priority, createdAt, updatedAt
      FROM tasks
      WHERE id = ?
      `
    )
    .get(id) as TaskRow | undefined

  return row ? toTaskRecord(row) : null
}

export function addTask(task: TaskRecord): TaskRecord {
  ensureStoreInitialized()
  const db = getTaskDatabase()
  db.prepare(
    `
    INSERT INTO tasks (id, title, description, year, completed, priority, createdAt, updatedAt)
    VALUES (@id, @title, @description, @year, @completed, @priority, @createdAt, @updatedAt)
    `
  ).run({
    id: task.id,
    title: task.title,
    description: task.description,
    year: task.year,
    completed: task.completed ? 1 : 0,
    priority: task.priority,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  })

  syncMirrorFile()
  return task
}

export function updateTaskInStore(id: string, updatedTask: TaskRecord): TaskRecord | null {
  ensureStoreInitialized()
  const db = getTaskDatabase()
  const result = db
    .prepare(
      `
      UPDATE tasks
      SET title = @title,
          description = @description,
          year = @year,
          completed = @completed,
          priority = @priority,
          createdAt = @createdAt,
          updatedAt = @updatedAt
      WHERE id = @id
      `
    )
    .run({
      id,
      title: updatedTask.title,
      description: updatedTask.description,
      year: updatedTask.year,
      completed: updatedTask.completed ? 1 : 0,
      priority: updatedTask.priority,
      createdAt: updatedTask.createdAt,
      updatedAt: updatedTask.updatedAt,
    })

  if (result.changes === 0) {
    return null
  }

  syncMirrorFile()
  return updatedTask
}

export function removeTaskById(id: string): boolean {
  ensureStoreInitialized()
  const db = getTaskDatabase()
  const result = db.prepare("DELETE FROM tasks WHERE id = ?").run(id)

  if (result.changes === 0) {
    return false
  }

  syncMirrorFile()
  return true
}

export function removeTaskByTitle(title: string): boolean {
  ensureStoreInitialized()
  const db = getTaskDatabase()
  const result = db.prepare("DELETE FROM tasks WHERE title = ?").run(title)

  if (result.changes === 0) {
    return false
  }

  syncMirrorFile()
  return true
}
