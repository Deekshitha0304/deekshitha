// "use client"

// interface BookCardProps {
//   title: string
//   author: string
//   year: number
//   available: boolean
//   deleteBook: (title: string) => void
//   toggleAvailability: (title: string) => void
// }

// export default function BookCard({
//   title,
//   author,
//   year,
//   available,
//   deleteBook,
//   toggleAvailability
// }: BookCardProps) {

//   return (

//     <div
//       style={{
//         border: "1px solid #ddd",
//         padding: "15px",
//         marginBottom: "15px",
//         borderRadius: "8px",
//         background: "#fafafa",
//         position: "relative"
//       }}
//     >

//       <h3>{title}</h3>

//       <p>by {author}</p>

//       <p>Year: {year}</p>



//       <p
//         style={{
//           color: available ? "#277a04" : "#d11322",
//           fontWeight: "bold"
//         }}
//       >
//         Status: {available ? "Available" : "Not Available"}
//       </p>



//       <button
//         onClick={() => toggleAvailability(title)}
//         style={{
//           position: "absolute",
//           right: "15px",
//           top: "40%",
//           padding: "6px 10px",
//           borderRadius: "5px",
//           border: "none",
//           background: available ? "#277a04" : "#d11322",
//           color: "white",
//           cursor: "pointer"
//         }}
//       >
//         Toggle
//       </button>



//       <button
//         onClick={() => deleteBook(title)}
//         style={{
//           position: "absolute",
//           right: "15px",
//           bottom: "10px",
//           background: "#d11322",
//           color: "white",
//           border: "none",
//           padding: "5px 10px",
//           borderRadius: "5px",
//           cursor: "pointer"
//         }}
//       >
//         Delete
//       </button>

//     </div>

//   )
// }

"use client"

import Link from "next/link"

interface TaskCardProps {
  taskId?: string
  title: string
  description: string
  year: number
  completed: boolean
  deleteTask: (title: string) => void
  toggleCompletion: (title: string) => void
}

export default function TaskCard({
  taskId,
  title,
  description,
  year,
  completed,
  deleteTask,
  toggleCompletion
}: TaskCardProps) {

  return (

    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {taskId ? (
            <Link
              href={`/tasks/${taskId}`}
              className="block truncate text-base font-semibold text-slate-900 hover:text-indigo-700"
            >
              {title}
            </Link>
          ) : (
            <h3 className="truncate text-base font-semibold text-slate-900">
              {title}
            </h3>
          )}
          <p className="mt-1 text-sm text-slate-600">
            {description}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
            completed
              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
              : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
          }`}
        >
          {completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
        <p>
          <span className="font-medium text-slate-800">Year:</span> {year}
        </p>
        <p>
          <span className="font-medium text-slate-800">Status:</span>{" "}
          {completed ? "Completed" : "Pending"}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          onClick={() => toggleCompletion(title)}
          className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          Toggle
        </button>

        <button
          onClick={() => deleteTask(title)}
          className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          Delete
        </button>
      </div>
    </div>

  )
}