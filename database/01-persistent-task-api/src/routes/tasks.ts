import { Router } from "express"
import { createTask, getUserTasks } from "../repositories/TaskRepository.js"

export const router = Router()

router.post("/", async (req, res) => {

  const { userId, title } = req.body

  const task = await createTask(userId, title)

  res.json(task)
})

router.get("/:userId", async (req, res) => {

  const userId = Number(req.params.userId)

  const tasks = await getUserTasks(userId)

  res.json(tasks)
})