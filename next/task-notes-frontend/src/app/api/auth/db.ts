import fs from "node:fs"
import path from "node:path"
import Database from "better-sqlite3"

export interface UserRecord {
  id: string
  email: string
  passwordHash: string
  createdAt: string
  updatedAt: string
}

const DATA_DIR = path.join(process.cwd(), "data")
const AUTH_DB_PATH = path.join(DATA_DIR, "auth.db")

declare global {
  var __taskNotesAuthDb__: Database.Database | undefined
}

function ensureDataDirectory() {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

function initializeSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      passwordHash TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `)
}

export function getAuthDatabase(): Database.Database {
  if (!globalThis.__taskNotesAuthDb__) {
    ensureDataDirectory()
    const db = new Database(AUTH_DB_PATH)
    db.pragma("journal_mode = WAL")
    initializeSchema(db)
    globalThis.__taskNotesAuthDb__ = db
  }

  return globalThis.__taskNotesAuthDb__
}

export function getUserByEmail(email: string): UserRecord | null {
  const db = getAuthDatabase()
  const row = db
    .prepare(
      `
      SELECT id, email, passwordHash, createdAt, updatedAt
      FROM users
      WHERE email = ?
      `
    )
    .get(email) as UserRecord | undefined

  return row ?? null
}

export function createUser(email: string, passwordHash: string): UserRecord {
  const db = getAuthDatabase()
  const now = new Date().toISOString()
  const user: UserRecord = {
    id: crypto.randomUUID(),
    email,
    passwordHash,
    createdAt: now,
    updatedAt: now
  }

  db.prepare(
    `
    INSERT INTO users (id, email, passwordHash, createdAt, updatedAt)
    VALUES (@id, @email, @passwordHash, @createdAt, @updatedAt)
    `
  ).run(user)

  return user
}
