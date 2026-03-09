import { Worker } from "bullmq"
import { connection } from "../redis.js"
import { reminderHandler, cleanupHandler } from "./handlers.js"

new Worker(
  "tasks",
  async (job) => {

    if (job.name === "task-reminder") {
      await reminderHandler(job)
    }

    if (job.name === "cleanup") {
      await cleanupHandler()
    }

  },
  { connection }
)