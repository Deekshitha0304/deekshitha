"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { usePathname, useRouter } from "next/navigation"

type AuthUser = {
  id?: string | number
  email?: string
  [key: string]: unknown
}

type AuthContextValue = {
  user: AuthUser | null
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") {
    return null
  }

  const entry = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`))

  if (!entry) {
    return null
  }

  return decodeURIComponent(entry.slice(name.length + 1))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const syncUserFromCookie = useCallback(() => {
    const userCookie = getCookieValue("user")

    if (!userCookie) {
      setUser(null)
      setLoading(false)
      return
    }

    try {
      const parsedUser = JSON.parse(userCookie) as AuthUser
      setUser(parsedUser)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    syncUserFromCookie()
  }, [pathname, syncUserFromCookie])

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
    } catch {
      // Even if the request fails, clear client state and force auth flow.
    } finally {
      setUser(null)
      router.push("/login")
      router.refresh()
    }
  }, [router])

  const value = useMemo(
    () => ({
      user,
      loading,
      logout,
    }),
    [loading, logout, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
