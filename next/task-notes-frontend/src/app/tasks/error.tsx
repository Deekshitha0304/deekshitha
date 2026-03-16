"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="w-full p-8">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold">We could not load your tasks.</h2>
        <p className="mt-2 text-sm text-red-800">
          Something went wrong while fetching tasks. Please try again or go back home.
        </p>

        <div className="mt-5 flex items-center gap-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center justify-center rounded-md border border-red-300 bg-transparent px-4 py-2 text-sm font-medium text-red-800 transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Go Home
          </button>
        </div>
      </div>
    </main>
  )
}

