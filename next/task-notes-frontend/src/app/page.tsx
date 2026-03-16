// export default function HomePage() {
//   return (
//     <div>
//       <h1>Welcome to Task Notes</h1>
//       <p>Manage your tasks efficiently using this Next.js application.</p>
//     </div>
//   )
// }




import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Task Notes - Task Management App",
  description: "A simple task management app built with Next.js.",
  openGraph: {
    title: "Task Notes",
    description: "Simple task management app built with Next.js"
  }
}

export default function HomePage() {
  return (
    <div className="w-full">

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        Welcome to Task Notes
      </h2>

      <p className="mt-3 text-slate-600">
        Manage your daily tasks efficiently with a simple, beginner-friendly Next.js app.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href="/tasks"
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Go to Tasks
        </a>
        <a
          href="/about"
          className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Learn more
        </a>
      </div>

      </div>

    </div>
  )
}