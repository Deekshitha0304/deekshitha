import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tasks - Manage Your Tasks",
  description: "Create, search, and manage your tasks efficiently.",
  openGraph: {
    title: "Task Notes",
    description: "Simple task management app built with Next.js"
  }
}

export default function TasksLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (

    <section>

      <div className="bg-slate-200 p-3 rounded mb-4">

        <h2 className="text-lg font-semibold">
          Task Management
        </h2>

        <p className="text-sm text-slate-600">
          Manage and organize your tasks
        </p>

      </div>

      {children}

    </section>

  )
}