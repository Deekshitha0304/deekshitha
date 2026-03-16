"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"

interface TaskToggleProps {
  taskId: string
  completed: boolean
}

export default function TaskToggle({ taskId, completed }: TaskToggleProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleToggle = async () => {
    if (isUpdating) return

    try {
      setIsUpdating(true)
      await api.updateTask(taskId, { completed: !completed })
      router.refresh()
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isUpdating}
      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${
        completed
          ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900"
          : "bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-900"
      } ${isUpdating ? "opacity-70" : ""}`}
    >
      {completed ? "Completed" : "Pending"}
    </button>
  )
}
