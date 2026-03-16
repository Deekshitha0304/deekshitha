import { addTask, getTasks, removeTaskByTitle } from "./data"
import { extractAuthTokenFromRequest, verifyAuthToken } from "../auth/token"

// export async function GET() {

//   const books = [

//     { title: "Book A", author: "Author A", year: 2001, available: true },

//     { title: "Book B", author: "Author B", year: 2002, available: false }

//   ]

//   return Response.json(books)

// }



export async function GET(request: Request) {
  const token = extractAuthTokenFromRequest(request)
  if (!token || !verifyAuthToken(token)) {
    return Response.json({ error: "Please log in first to view tasks." }, { status: 401 })
  }

  return Response.json(await getTasks())
}

export async function POST(request: Request) {
  const token = extractAuthTokenFromRequest(request)
  if (!token || !verifyAuthToken(token)) {
    return Response.json({ error: "Please log in first to create tasks." }, { status: 401 })
  }

  const payload = await request.json().catch(() => null)
  const title = payload && typeof payload.title === "string" ? payload.title.trim() : ""
  const description =
    payload && typeof payload.description === "string" ? payload.description.trim() : ""
  const normalizedPriority =
    payload && typeof payload.priority === "string" ? payload.priority.toLowerCase() : ""
  const priority =
    normalizedPriority === "low" ||
    normalizedPriority === "medium" ||
    normalizedPriority === "high"
      ? normalizedPriority
      : null
  const completed = payload && typeof payload.completed === "boolean" ? payload.completed : false

  if (!title || !description || !priority) {
    return Response.json({ error: "Invalid task payload" }, { status: 400 })
  }

  const now = new Date().toISOString()
  const newTask = {
    id: crypto.randomUUID(),
    title,
    description,
    year: new Date().getFullYear(),
    completed,
    priority,
    createdAt: now,
    updatedAt: now,
  }

  return Response.json(await addTask(newTask), { status: 201 })
}

export async function DELETE(request: Request) {
  const token = extractAuthTokenFromRequest(request)
  if (!token || !verifyAuthToken(token)) {
    return Response.json({ error: "Please log in first to delete tasks." }, { status: 401 })
  }

  const payload = await request.json().catch(() => null)
  const title = payload && typeof payload.title === "string" ? payload.title : ""

  if (!title) {
    return Response.json({ error: "Task title is required" }, { status: 400 })
  }

  await removeTaskByTitle(title)

  return Response.json({ success: true })
}