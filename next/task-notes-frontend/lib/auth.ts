import { apiRequest, ApiError } from "@/lib/api"

export interface LoginResult {
  token: string
}

export interface RegisterInput {
  email: string
  password: string
  confirmPassword?: string
}

export interface AuthError {
  message: string
}

export async function loginUser(email: string, password: string): Promise<LoginResult> {
  try {
    return await apiRequest<LoginResult>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    })
  } catch (error) {
    const isApiError = (error as ApiError | undefined)?.status != null

    if (isApiError && (error as ApiError).status === 401) {
      throw new Error("Invalid email or password")
    }

    throw new Error(
      error instanceof Error ? error.message : "Unable to login. Please try again."
    )
  }
}

export async function registerUser(input: RegisterInput): Promise<void> {
  const { email, password } = input

  try {
    await apiRequest<unknown>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password })
    })
  } catch (error) {
    const isApiError = (error as ApiError | undefined)?.status != null

    if (isApiError && (error as ApiError).status === 409) {
      throw new Error("An account with this email already exists")
    }

    throw new Error(
      error instanceof Error ? error.message : "Unable to register. Please try again."
    )
  }
}

