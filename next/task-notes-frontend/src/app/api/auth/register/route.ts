import bcrypt from "bcryptjs"
import { createUser, getUserByEmail } from "../db"

export const runtime = "nodejs"

interface RegisterPayload {
  email?: unknown
  password?: unknown
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as RegisterPayload
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : ""
  const password = typeof payload.password === "string" ? payload.password : ""

  if (!email || !password) {
    return Response.json({ error: "Email and password are required." }, { status: 400 })
  }

  if (password.length < 6) {
    return Response.json({ error: "Password must be at least 6 characters." }, { status: 400 })
  }

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return Response.json({ error: "An account with this email already exists." }, { status: 409 })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await createUser(email, passwordHash)

  return Response.json(
    {
      message: "Account created successfully",
      user: {
        id: user.id,
        email: user.email
      }
    },
    { status: 201 }
  )
}
