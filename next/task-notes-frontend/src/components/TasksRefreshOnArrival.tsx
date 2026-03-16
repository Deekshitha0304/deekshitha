"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

const REFRESH_FLAG_KEY = "tasks-refresh-on-arrival"

export default function TasksRefreshOnArrival() {
  const router = useRouter()

  useEffect(() => {
    try {
      const shouldRefresh = sessionStorage.getItem(REFRESH_FLAG_KEY) === "1"
      if (!shouldRefresh) {
        return
      }

      sessionStorage.removeItem(REFRESH_FLAG_KEY)
      router.refresh()
    } catch {
      // Ignore storage errors (e.g. private browsing restrictions).
    }
  }, [router])

  return null
}
