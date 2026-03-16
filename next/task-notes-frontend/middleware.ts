import { jwtVerify } from "jose"
import { NextResponse, type NextRequest } from "next/server"

function redirectToLogin(request: NextRequest, clearAuthCookies = true): NextResponse {
  const response = NextResponse.redirect(new URL("/login", request.url))

  if (clearAuthCookies) {
    response.cookies.delete("auth-token")
    response.cookies.delete("user")
  }

  return response
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    return redirectToLogin(request)
  }

  try {
    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error("JWT_SECRET environment variable is required")
    }

    await jwtVerify(token, new TextEncoder().encode(secret))
    return NextResponse.next()
  } catch {
    return redirectToLogin(request, true)
  }
}

export const config = {
  matcher: ["/tasks", "/tasks/:path*"]
}
