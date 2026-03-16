"use client"

import { useState } from "react"

export default function Counter() {

  const [count, setCount] = useState(0)

  return (
   <div className="mt-10 rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Counter
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Value: <span className="font-medium text-foreground">{count}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCount(count - 1)}
            className="inline-flex items-center justify-center rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Decrement
          </button>

          <button
            onClick={() => setCount(count + 1)}
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Increment
          </button>
        </div>
      </div>

    </div>
  )
}