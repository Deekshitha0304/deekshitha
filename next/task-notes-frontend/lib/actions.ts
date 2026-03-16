"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { apiClient } from "@/lib/api-client"
import type { ApiError } from "@/lib/api"

type TaskId = string | number

export async function toggleTaskCompletion(taskId: TaskId, completed: boolean): Promise<void> {
  try {
    await apiClient.updateTask(taskId, { completed })
  } catch (error) {
    if ((error as ApiError | undefined)?.status === 401) {
      redirect("/login")
    }

    throw error
  }

  revalidatePath("/tasks")
  revalidatePath(`/tasks/${taskId}`)
}

export async function deleteTask(taskId: TaskId): Promise<void> {
  try {
    await apiClient.deleteTask(taskId)
  } catch (error) {
    if ((error as ApiError | undefined)?.status === 401) {
      redirect("/login")
    }

    throw error
  }

  revalidatePath("/tasks")
  revalidatePath(`/tasks/${taskId}`)
}
