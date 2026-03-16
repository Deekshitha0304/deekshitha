import fs from "node:fs"
import path from "node:path"
import Database from "better-sqlite3"

export interface TaskSnapshotRecord {
  id: string
  title: string
  description: string
  year: number
  completed: boolean
  priority: "low" | "medium" | "high"
  createdAt: string
  updatedAt: string
}

function resolveDataDir() {
  // Vercel's deployment filesystem is read-only. /tmp is writable at runtime.
  if (process.env.VERCEL) {
    return path.join("/tmp", "task-notes-frontend-data")
  }

  return path.join(process.cwd(), "data")
}

const DATA_DIR = resolveDataDir()
const TASKS_DB_PATH = path.join(DATA_DIR, "tasks.db")
const TASKS_JSON_PATH = path.join(DATA_DIR, "tasks.json")

declare global {
  var __taskNotesSqliteDb__: Database.Database | undefined
}

function ensureDataDirectory() {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

function initializeSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      year INTEGER NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      priority TEXT NOT NULL CHECK(priority IN ('low', 'medium', 'high')),
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `)
}

export function getTaskDatabase(): Database.Database {
  if (!globalThis.__taskNotesSqliteDb__) {
    ensureDataDirectory()
    const db = new Database(TASKS_DB_PATH)
    db.pragma("journal_mode = WAL")
    initializeSchema(db)
    globalThis.__taskNotesSqliteDb__ = db
  }

  return globalThis.__taskNotesSqliteDb__
}

export function syncTasksToJson(tasks: TaskSnapshotRecord[]) {
  ensureDataDirectory()
  const tempPath = `${TASKS_JSON_PATH}.tmp`
  const content = `${JSON.stringify(tasks, null, 2)}\n`
  fs.writeFileSync(tempPath, content, "utf8")
  fs.renameSync(tempPath, TASKS_JSON_PATH)
}
