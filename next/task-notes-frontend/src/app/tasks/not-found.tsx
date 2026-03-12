import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Task not found
        </h2>
        <p className="mt-2 text-slate-600">
          The task you’re looking for doesn’t exist yet.
        </p>

        <Link
          href="/tasks"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Back to Tasks
        </Link>
      </div>
    </div>
  )
}

