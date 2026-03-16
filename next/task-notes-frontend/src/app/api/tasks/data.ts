import prisma from "@/src/lib/prisma"
import { ensureTaskSchema } from "./db"

export interface TaskRecord {
  id: string
  title: string
  description: string
  year: number
  completed: boolean
  priority: "low" | "medium" | "high"
  createdAt: string
  updatedAt: string
}

declare global {
  var __taskNotesStoreInitialized__: boolean | undefined
}

function toTaskRecord(row: TaskRow): TaskRecord {
  const priority =
    row.priority === "low" || row.priority === "medium" || row.priority === "high"
      ? row.priority
      : "medium"

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    year: row.year,
    completed: Boolean(row.completed),
    priority,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

interface TaskRow {
  id: string
  title: string
  description: string
  year: number
  completed: boolean
  priority: string
  createdAt: Date
  updatedAt: Date
}

async function queryAllTasks(): Promise<TaskRecord[]> {
  const rows = (await prisma.task.findMany({
    orderBy: [{ createdAt: "asc" }, { id: "asc" }]
  })) as TaskRow[]

  return rows.map((row) =>
    toTaskRecord({
      id: row.id,
      title: row.title,
      description: row.description,
      year: row.year,
      completed: row.completed,
      priority: row.priority,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    })
  )
}

async function ensureStoreInitialized() {
  await ensureTaskSchema()

  if (globalThis.__taskNotesStoreInitialized__) {
    return
  }

  globalThis.__taskNotesStoreInitialized__ = true
}

async function getTaskStore(): Promise<TaskRecord[]> {
  await ensureStoreInitialized()
  return queryAllTasks()
}

export async function getTasks(): Promise<TaskRecord[]> {
  return getTaskStore()
}

export async function getTaskById(id: string): Promise<TaskRecord | null> {
  await ensureStoreInitialized()
  const row = await prisma.task.findUnique({ where: { id } })

  if (!row) {
    return null
  }

  return toTaskRecord({
    id: row.id,
    title: row.title,
    description: row.description,
    year: row.year,
    completed: row.completed,
    priority: row.priority,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  })
}

export async function addTask(task: TaskRecord): Promise<TaskRecord> {
  await ensureStoreInitialized()
  await prisma.task.create({
    data: {
      id: task.id,
      title: task.title,
      description: task.description,
      year: task.year,
      completed: task.completed,
      priority: task.priority,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt)
    }
  })

  return task
}

export async function updateTaskInStore(
  id: string,
  updatedTask: TaskRecord
): Promise<TaskRecord | null> {
  await ensureStoreInitialized()
  const existing = await prisma.task.findUnique({ where: { id }, select: { id: true } })
  if (!existing) {
    return null
  }

  await prisma.task.update({
    where: { id },
    data: {
      title: updatedTask.title,
      description: updatedTask.description,
      year: updatedTask.year,
      completed: updatedTask.completed,
      priority: updatedTask.priority,
      createdAt: new Date(updatedTask.createdAt),
      updatedAt: new Date(updatedTask.updatedAt)
    }
  })

  return updatedTask
}

export async function removeTaskById(id: string): Promise<boolean> {
  await ensureStoreInitialized()
  const result = await prisma.task.deleteMany({ where: { id } })
  if (result.count === 0) {
    return false
  }

  return true
}

export async function removeTaskByTitle(title: string): Promise<boolean> {
  await ensureStoreInitialized()
  const result = await prisma.task.deleteMany({ where: { title } })
  if (result.count === 0) {
    return false
  }

  return true
}
