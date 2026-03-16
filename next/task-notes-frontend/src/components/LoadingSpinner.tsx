"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: number
}

export default function LoadingSpinner({ size = 22 }: LoadingSpinnerProps) {
  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 text-center shadow-sm">
      <div className="flex items-center justify-center gap-3">
        <motion.span
          aria-hidden="true"
          className="inline-block rounded-full border-2 border-muted border-t-primary"
          style={{ width: size, height: size }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
        <span className="text-sm font-medium text-muted-foreground">Loading...</span>
      </div>
    </div>
  )
}