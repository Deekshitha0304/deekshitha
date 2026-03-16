"use client"

import Link from "next/link"
import { createPortal } from "react-dom"
import { useEffect } from "react"
import { Button } from "@/src/components/ui/button"

type AuthRequiredModalProps = {
  open: boolean
  onClose: () => void
  actionLabel?: string
}

export default function AuthRequiredModal({
  open,
  onClose,
  actionLabel = "perform this action",
}: AuthRequiredModalProps) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onClose])

  if (!open || typeof document === "undefined") {
    return null
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/65 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-required-title"
        aria-describedby="auth-required-description"
        className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-card-foreground shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="auth-required-title" className="text-xl font-semibold tracking-tight">
          Authentication required
        </h2>
        <p id="auth-required-description" className="mt-2 text-sm text-muted-foreground">
          You must be logged in to {actionLabel}.
        </p>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button asChild variant="secondary">
            <Link href="/register">Register</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}
