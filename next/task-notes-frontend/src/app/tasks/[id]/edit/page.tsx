import Link from "next/link"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"
import { apiClient } from "@/lib/api-client"
import type { ApiError } from "@/lib/api"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { TaskForm } from "@/components/task-form"

interface EditTaskPageProps {
  params: Promise<{
    id: string
  }>
}

async function updateTask(id: string, formData: FormData) {
  "use server"

  const title = String(formData.get("title") ?? "").trim()
  const priority = String(formData.get("priority") ?? "").toLowerCase()
  const completed = formData.get("completed") === "on"

  if (!title) {
    throw new Error("Title is required")
  }

  try {
    await apiClient.updateTask(id, {
      title,
      priority: priority as "low" | "medium" | "high",
      completed,
    })

    revalidatePath("/tasks")
    revalidatePath(`/tasks/${id}`)
    redirect(`/tasks/${id}`)
  } catch (error) {
    const status = (error as ApiError | undefined)?.status
    if (status === 401) {
      redirect("/login")
    }

    console.error("Failed to update task:", error)
    throw new Error("Failed to update task")
  }
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { id } = await params
  const updateTaskWithId = updateTask.bind(null, id)
  let task: Awaited<ReturnType<typeof apiClient.getTask>>

  try {
    task = await apiClient.getTask(id)
  } catch (error) {
    if ((error as ApiError | undefined)?.status === 401) {
      redirect("/login")
    }

    notFound()
  }

  return (
    <div className="w-full">
      <Card className="interactive-lift">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">Edit Task</CardTitle>
          <p className="text-sm text-muted-foreground">
            Update the task details and save your changes.
          </p>
        </CardHeader>
        <CardContent>
          <TaskForm
            action={updateTaskWithId}
            submitLabel="Update Task"
            defaultValues={{
              title: task.title,
              priority: task.priority as "low" | "medium" | "high",
              completed: task.completed,
            }}
            showCompletedCheckbox
          />
          <div className="mt-4 flex items-center justify-end">
            <Button type="button" variant="outline" asChild>
              <Link href={`/tasks/${id}`}>Cancel</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
