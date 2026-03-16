import bcrypt from "bcryptjs"
import { getUserByEmail } from "../db"
import { signAuthToken } from "../token"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

interface LoginPayload {
  email?: unknown
  password?: unknown
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as LoginPayload
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : ""
  const password = typeof payload.password === "string" ? payload.password : ""

  if (!email || !password) {
    return Response.json({ error: "Email and password are required." }, { status: 400 })
  }

  const user = await getUserByEmail(email)
  if (!user) {
    return Response.json({ error: "Invalid email or password." }, { status: 401 })
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash)
  if (!isValidPassword) {
    return Response.json({ error: "Invalid email or password." }, { status: 401 })
  }

  const token = signAuthToken({ sub: user.id, email: user.email })
  const response = NextResponse.json({
    token,
    user: {
      id: user.id,
      email: user.email
    }
  })

  response.cookies.set("auth-token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  })

  response.cookies.set("user", JSON.stringify({ id: user.id, email: user.email }), {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  })

  return response
}
