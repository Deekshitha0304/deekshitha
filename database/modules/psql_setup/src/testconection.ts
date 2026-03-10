import { pool } from "./db";

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");            //current time according to the database server
    console.log(result.rows);
  } catch (error) {
    console.error("Database error:", error);
  }
}

testConnection();