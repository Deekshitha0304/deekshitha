import express from "express"
import dotenv from "dotenv"
import { pool } from "./database.js"
import { router as taskRoutes } from "./routes/tasks.js"

dotenv.config()

const app = express()
app.use(express.json())

app.use("/tasks", taskRoutes)

const server = app.listen(3000, () => {
  console.log("Server running on port 3000")
})

async function shutdown() {

  console.log("Shutting down server...")

  await pool.end()

  server.close(() => {
    console.log("Server closed")
    process.exit(0)
  })
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)