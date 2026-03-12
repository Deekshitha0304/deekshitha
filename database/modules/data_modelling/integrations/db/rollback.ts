import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

async function rollbackLast() {

  const res = await pool.query(`
    SELECT filename
    FROM migrations
    ORDER BY applied_at DESC
    LIMIT 1
  `)

  if (res.rows.length === 0) {
    console.log("No migrations to rollback")
    return
  }

  const file = res.rows[0].filename

  console.log(`Rollback needed for ${file}`)
  console.log("Manual rollback SQL required")

}

rollbackLast()