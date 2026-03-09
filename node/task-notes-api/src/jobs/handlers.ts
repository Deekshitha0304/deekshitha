import { Job } from "bullmq"

export const reminderHandler = async (job: Job) => {

  const { taskId } = job.data

  console.log("Sending reminder for task:", taskId)

  // In real system:
  // send email / push notification

}

export const cleanupHandler = async () => {

  console.log("Running cleanup job")

  // Example:
  // remove completed tasks older than 30 days

}