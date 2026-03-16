"use server"

import { z } from "zod"

const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  priority: z.enum(["low", "medium", "high"]),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>

export interface CreateTaskResult {
  success: boolean
  error?: string
  createdAt?: number
  year?: number
}

export async function createTask(input: CreateTaskInput): Promise<CreateTaskResult> {
  const parsed = createTaskSchema.safeParse(input)

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid details. Please fill in all required fields.",
    }
  }

  const createdAt = Date.now()
  const year = new Date(createdAt).getFullYear()

  return {
    success: true,
    createdAt,
    year,
  }
}
