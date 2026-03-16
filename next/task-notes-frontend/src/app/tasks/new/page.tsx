import Link from "next/link"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { apiClient } from "@/lib/api-client"
import type { ApiError } from "@/lib/api"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { TaskForm } from "@/components/task-form"

const PRIORITIES = ["low", "medium", "high"] as const
type Priority = (typeof PRIORITIES)[number]

async function createTask(formData: FormData) {
  "use server"

  const title = String(formData.get("title") ?? "").trim()
  const description = String(formData.get("description") ?? "").trim()
  const priority = String(formData.get("priority") ?? "").toLowerCase() as Priority

  if (!title || !description || !PRIORITIES.includes(priority)) {
    throw new Error("Invalid task details")
  }

  try {
    await apiClient.createTask({
      title,
      priority,
      description,
      completed: false,
    })
  } catch (error) {
    const status = (error as ApiError | undefined)?.status
    if (status === 401) {
      redirect("/login")
    }

    console.error("Failed to create task:", error)
    throw new Error("Failed to create task")
  }

  revalidatePath("/tasks")
  redirect("/tasks")
}

export default function NewTaskPage() {
  return (
    <div className="w-full">
      <Card className="interactive-lift">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">Create Task</CardTitle>
          <p className="text-sm text-muted-foreground">
            Add a new task with a title and priority.
          </p>
        </CardHeader>
        <CardContent>
          <TaskForm action={createTask} submitLabel="Create Task" includeDescription />
          <div className="mt-4 flex items-center justify-end">
            <Button type="button" variant="outline" asChild>
              <Link href="/tasks">Cancel</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
