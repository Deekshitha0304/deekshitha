import Link from "next/link"
import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { apiClient } from "../../../../lib/api-client"
import type { ApiError } from "../../../../lib/api"

interface TaskDetailPageProps {
  params: Promise<{
    id: string
  }>
}

function getPriorityBadgeClasses(priority: string) {
  if (priority === "high") {
    return "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300"
  }

  if (priority === "medium") {
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-300"
  }

  return "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300"
}

export async function generateMetadata({
  params,
}: TaskDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const numericId = Number(id)
  const taskId = Number.isFinite(numericId) ? numericId : id

  try {
    const task = await apiClient.getTask(taskId)

    return {
      title: `${task.title} - Task Notes`,
      description: `Task: ${task.title}`,
    }
  } catch {
    return {
      title: "Task - Task Notes",
      description: "Task details",
    }
  }
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { id } = await params
  const numericId = Number(id)
  const taskId = Number.isFinite(numericId) ? numericId : id

  let task

  try {
    task = await apiClient.getTask(taskId)
  } catch (error) {
    if ((error as ApiError | undefined)?.status === 401) {
      redirect("/login")
    }

    notFound()
  }

  return (
    <main className="animate-page-in w-full p-8">
      <div className="interactive-lift rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-semibold">{task.title}</h1>

          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${getPriorityBadgeClasses(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </div>

        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Priority:</span>{" "}
            {task.priority}
          </p>

          <p>
            <span className="font-medium text-foreground">Created:</span>{" "}
            {new Date(task.createdAt).toLocaleString()}
          </p>

          <p>
            <span className="font-medium text-foreground">Updated:</span>{" "}
            {new Date(task.updatedAt).toLocaleString()}
          </p>
        </div>

        <Link
          href="/tasks"
          className="mt-6 inline-block text-sm font-medium text-primary transition-all duration-200 hover:-translate-y-0.5 hover:underline"
        >
          Back to Tasks
        </Link>
      </div>
    </main>
  )
}