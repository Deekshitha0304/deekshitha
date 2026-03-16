"use client"

import { useCallback, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"

export function useAuthGuard(initialAuthenticated = false) {
  const { user } = useAuth()
  const [isAuthRequiredModalOpen, setIsAuthRequiredModalOpen] = useState(false)
  const isAuthenticated = Boolean(user) || initialAuthenticated

  const runIfAuthenticated = useCallback(
    (action: () => void): void => {
      if (isAuthenticated) {
        action()
        return
      }

      setIsAuthRequiredModalOpen(true)
    },
    [isAuthenticated]
  )

  return {
    runIfAuthenticated,
    isAuthRequiredModalOpen,
    closeAuthRequiredModal: useCallback(() => setIsAuthRequiredModalOpen(false), []),
  }
}
