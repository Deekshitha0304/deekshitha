import jwt from "jsonwebtoken"

interface TokenPayload {
  sub: string
  email: string
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is required")
  }
  return secret
}

export function signAuthToken(payload: TokenPayload): string {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: "7d"
  })
}

export function verifyAuthToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, getJwtSecret())

    if (!decoded || typeof decoded === "string") {
      return null
    }

    const sub = typeof decoded.sub === "string" ? decoded.sub : ""
    const email = typeof decoded.email === "string" ? decoded.email : ""

    if (!sub || !email) {
      return null
    }

    return { sub, email }
  } catch {
    return null
  }
}

export function extractAuthTokenFromRequest(request: Request): string | null {
  const authorizationHeader = request.headers.get("authorization")

  if (authorizationHeader?.startsWith("Bearer ")) {
    const bearerToken = authorizationHeader.slice("Bearer ".length).trim()
    if (bearerToken) {
      return bearerToken
    }
  }

  const cookieHeader = request.headers.get("cookie")
  if (!cookieHeader) {
    return null
  }

  const tokenCookie = cookieHeader
    .split(";")
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith("auth-token="))

  if (!tokenCookie) {
    return null
  }

  const rawToken = tokenCookie.slice("auth-token=".length)
  return rawToken ? decodeURIComponent(rawToken) : null
}
