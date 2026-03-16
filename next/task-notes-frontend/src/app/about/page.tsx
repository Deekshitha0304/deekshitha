// export default function AboutPage() {
//   return (
//     <div>
//       <h1>About</h1>
//       <p>This app helps you manage tasks using Next.js.</p>
//     </div>
//   )
// }



import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About - Task Notes",
  description: "Learn more about the Task Notes app and what it helps you practice.",
  openGraph: {
    title: "Task Notes",
    description: "Simple task management app built with Next.js"
  }
}

export default function AboutPage() {
  return (
    <div className="w-full">

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

      <h2 className="text-2xl font-bold mb-4">
        About
      </h2>

      <p className="text-slate-600">
        Task Notes is a simple task management app built with Next.js.
      </p>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p>
          It focuses on practicing core React concepts like state, props, and component reuse.
        </p>
        <p>
          The UI uses Tailwind CSS for clean spacing, consistent buttons, and readable layouts.
        </p>
      </div>

      </div>

    </div>
  )
}