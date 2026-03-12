"use client"

import { use, useEffect, useState } from "react"

interface TaskDetailPageProps {
  params: Promise<{
    id: string
  }>
}

interface Task {
  id: string
  title: string
  description: string
  year: number
  completed: boolean
}

export default function TaskDetailPage({ params }: TaskDetailPageProps) {
  const resolvedParams = use(params)
  const id = resolvedParams?.id ?? ""
  const [task, setTask] = useState<Task | null | undefined>(undefined)

useEffect(() => {

  if (!id) {
    setTask(null)   
    return
  }
  const savedTasks = localStorage.getItem("tasks")

  let nextTask: Task | null = null

  if (savedTasks) {
    try {
      const parsed = JSON.parse(savedTasks)

      if (Array.isArray(parsed)) {
        const foundTask =
          parsed.find((task: Task) => task.id.toString() === id.toString()) ?? null

        nextTask = foundTask
      }

    } catch {
      nextTask = null
    }
  }

  setTask(nextTask)

}, [id])
  return (
    <div className="mx-auto max-w-3xl">
      {task ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold text-slate-900">
                {task.title}
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                {task.description}
              </p>
            </div>

            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                task.completed
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                  : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <p>
              <span className="font-medium text-slate-800">Year:</span> {task.year}
            </p>
            <p>
              <span className="font-medium text-slate-800">Status:</span>{" "}
              {task.completed ? "Completed" : "Pending"}
            </p>
          </div>
        </div>
      ) : task === null ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm sm:p-5">
          
          Task not found
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm sm:p-5">
          Loading task...
        </div>
      )}
    </div>
  )
}

