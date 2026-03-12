"use client"

export default function Error({
  reset
}: {
  reset: () => void
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold">
          Something went wrong while loading tasks.
        </h2>
        <p className="mt-2 text-sm text-red-800">
          Try again. If the problem continues, refresh the page.
        </p>

        <button
          onClick={() => reset()}
          className="mt-5 inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          Retry
        </button>
      </div>
    </div>
  )
}

