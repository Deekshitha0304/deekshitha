import { getTaskById, removeTaskById, type TaskRecord, updateTaskInStore } from "../data";
import { extractAuthTokenFromRequest, verifyAuthToken } from "../../auth/token";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = extractAuthTokenFromRequest(request)
  if (!token || !verifyAuthToken(token)) {
    return Response.json({ error: "Please log in first to view tasks." }, { status: 401 })
  }

  const { id } = await params
  const task = getTaskById(id)

  if (!task) {
    return Response.json({ error: "Task not found" }, { status: 404 })
  }

  return Response.json(task)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = extractAuthTokenFromRequest(request)
  if (!token || !verifyAuthToken(token)) {
    return Response.json({ error: "Please log in first to edit tasks." }, { status: 401 })
  }

  const { id } = await params
  const payload = (await request.json().catch(() => ({}))) as Partial<TaskRecord>
  const existingTask = getTaskById(id)

  if (!existingTask) {
    return Response.json({ error: "Task not found" }, { status: 404 })
  }

  const now = new Date().toISOString()
  const normalizedPriority =
    typeof payload.priority === "string" ? payload.priority.toLowerCase() : undefined
  const priority =
    normalizedPriority === "low" || normalizedPriority === "medium" || normalizedPriority === "high"
      ? normalizedPriority
      : existingTask.priority

  const updatedTask: TaskRecord = {
    ...existingTask,
    ...payload,
    id,
    priority,
    title: typeof payload.title === "string" ? payload.title : existingTask.title,
    completed: typeof payload.completed === "boolean" ? payload.completed : existingTask.completed,
    updatedAt: now,
  }

  updateTaskInStore(id, updatedTask)

  return Response.json(updatedTask)
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = extractAuthTokenFromRequest(request)
  if (!token || !verifyAuthToken(token)) {
    return Response.json({ error: "Please log in first to delete tasks." }, { status: 401 })
  }

  const { id } = await params

  if (!removeTaskById(id)) {
    return Response.json({ error: "Task not found" }, { status: 404 })
  }

  return Response.json({ success: true, id })
}
