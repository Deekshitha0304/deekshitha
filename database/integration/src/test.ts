import { pool } from "./db";     // Pool -> instead of creating new connections , it reuses them

async function testDB() {
  const result = await pool.query("SELECT NOW()");
  console.log(result.rows);
}

testDB();