import fs from "fs"
import path from "path"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

async function runMigrations() {                //can run this once manually or create it in the runner.

  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      applied_at TIMESTAMP DEFAULT NOW()
    )
  `)

  const migrationsDir = path.join(__dirname, "migrations")

  const files = fs
    .readdirSync(migrationsDir)
    .filter(f => f.endsWith(".sql"))
    .sort()

  const result = await pool.query("SELECT filename FROM migrations")

  const applied = new Set(result.rows.map(r => r.filename))

  for (const file of files) {

    if (applied.has(file)) {
      console.log(`Skipping ${file}`)
      continue
    }

    console.log(`Applying ${file}`)

    const sql = fs.readFileSync(
      path.join(migrationsDir, file),
      "utf8"
    )

    await pool.query(sql)

    await pool.query(
      "INSERT INTO migrations(filename) VALUES($1)",
      [file]
    )

  }

  console.log("Migrations complete")
}

runMigrations()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })