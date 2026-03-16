"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"

const navItemClasses =
  "rounded-md border border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-accent hover:text-accent-foreground"

export default function AuthNav() {
  const { user, loading, logout } = useAuth()

  if (loading) {
    return null
  }

  if (user) {
    return (
      <button type="button" onClick={logout} className={navItemClasses}>
        Logout
      </button>
    )
  }

  return (
    <>
      <Link href="/login" className={navItemClasses}>
        Login
      </Link>

      <Link href="/register" className={navItemClasses}>
        Register
      </Link>
    </>
  )
}
