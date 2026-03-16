"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { api } from "@/lib/api"
import type { ApiError } from "@/lib/api"

export interface LoginState {
  error?: string
}

export interface RegisterState {
  error?: string
  success?: string
}

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  void prevState

  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!email || !password) {
    return {
      error: "Email and password are required."
    }
  }

  try {
    const result = await api.auth.login({ email, password })
    const token = result?.token

    if (!token) {
      return { error: "Login failed. Please try again." }
    }

    const cookieStore = await cookies()

    cookieStore.set("auth-token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    if (result.user) {
      cookieStore.set("user", JSON.stringify(result.user), {
        // User profile cookie is intentionally client-readable for AuthContext.
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      })
    }
  } catch (error) {
    const status = (error as ApiError | undefined)?.status
    if (status === 401) {
      return { error: "Invalid email or password." }
    }

    return {
      error: error instanceof Error ? error.message : "Login failed. Please try again."
    }
  }

  redirect("/tasks")
}

export async function register(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  void prevState

  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const confirmPassword = String(formData.get("confirmPassword") ?? "")

  if (!email || !password || !confirmPassword) {
    return { error: "All fields are required." }
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." }
  }

  try {
    await api.auth.register({ email, password })
    return { success: "Account created successfully" }
  } catch (error) {
    const status = (error as ApiError | undefined)?.status
    if (status === 409) {
      return { error: "An account with this email already exists." }
    }

    return {
      error: error instanceof Error ? error.message : "Registration failed. Please try again."
    }
  }
}

export async function logout(): Promise<never> {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
  cookieStore.delete("user")
  redirect("/login")
}

