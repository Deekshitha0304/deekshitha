import { Queue } from "bullmq"
import { connection } from "../redis.js"

export class TaskScheduler {

  private queue: Queue

  constructor() {
    this.queue = new Queue("tasks", { connection })
  }

  async scheduleReminder(taskId: string, dueDate: Date) {
    await this.queue.add(
      "task-reminder",
      { taskId },
      {
        delay: dueDate.getTime() - Date.now()
      }
    )
  }

  async scheduleCleanup() {
    await this.queue.add(
      "cleanup",
      {},
      {
        repeat: {
          pattern: "0 3 * * *"
        }
      }
    )
  }
}