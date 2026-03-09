import Database from "better-sqlite3"

export interface User {
  id: number
  email: string
  password_hash: string
  role: "user" | "admin"
  created_at: string
}

export class UserDatabase {

  private db: Database.Database

  constructor() {
    this.db = new Database("database/app.db")
    this.init()
  }

  private init() {

    this.db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        created_at TEXT
      )
    `).run()

  }

  createUser(email: string, passwordHash: string, role: string = "user"): User {

    const stmt = this.db.prepare(`
      INSERT INTO users (email, password_hash, role, created_at)
      VALUES (?, ?, ?, ?)
    `)

    const result = stmt.run(email, passwordHash, role, new Date().toISOString())

    return {
      id: Number(result.lastInsertRowid),
      email,
      password_hash: passwordHash,
      role: role as any,
      created_at: new Date().toISOString()
    }

  }

  getUserByEmail(email: string): User | null {

    const stmt = this.db.prepare(`
      SELECT * FROM users WHERE email = ?
    `)

    const user = stmt.get(email) as User | undefined

    return user ?? null
  }

  getUserById(id: number): User | null {

    const stmt = this.db.prepare(`
      SELECT * FROM users WHERE id = ?
    `)

    const user = stmt.get(id) as User | undefined

    return user || null
  }

}