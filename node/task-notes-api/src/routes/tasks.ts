import { Router, Request, Response } from "express"
import { z } from "zod"
import { randomUUID } from "crypto"
import { FileStorage } from "../storage"
import { Task } from "../models/task"

export const taskRouter = Router()

const storage = new FileStorage("data/tasks.json")

/*
VALIDATION SCHEMA
*/

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium")
})

/*
GET /api/tasks
*/
taskRouter.get("/", async (req: Request, res: Response) => {

  const tasks = await storage.loadNotes()

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10

  const start = (page - 1) * limit
  const end = start + limit

  const paginated = tasks.slice(start, end)

  res.json({
    page,
    limit,
    total: tasks.length,
    data: paginated
  })
})

/*
POST /api/tasks
*/
taskRouter.post("/", async (req: Request, res: Response) => {

  const parsed = taskSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.format()
    })
  }

  const tasks = await storage.loadNotes()

  const newTask: Task = {
    id: randomUUID(),
    title: parsed.data.title,
    description: parsed.data.description,
    priority: parsed.data.priority,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  tasks.push(newTask)

  await storage.saveNotes(tasks)

  res.status(201).json(newTask)
})

/*
GET /api/tasks/:id
*/
taskRouter.get("/:id", async (req: Request, res: Response) => {

  const tasks = await storage.loadNotes()

  const task = tasks.find((t: Task) => t.id === req.params.id)

  if (!task) {
    return res.status(404).json({ error: "Task not found" })
  }

  res.json(task)
})

/*
PUT /api/tasks/:id
*/
taskRouter.put("/:id", async (req: Request, res: Response) => {

  const tasks = await storage.loadNotes()

  const index = tasks.findIndex((t: Task) => t.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" })
  }

  tasks[index] = {
    ...tasks[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  }

  await storage.saveNotes(tasks)

  res.json(tasks[index])
})

/*
DELETE /api/tasks/:id
*/
taskRouter.delete("/:id", async (req: Request, res: Response) => {

  const tasks = await storage.loadNotes()

  const filtered = tasks.filter((t: Task) => t.id !== req.params.id)

  await storage.saveNotes(filtered)

  res.json({
    message: "Task deleted"
  })
})