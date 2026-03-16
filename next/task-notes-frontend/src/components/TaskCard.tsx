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
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

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

    <Card>
      <CardContent className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {taskId ? (
            <Link
              href={`/tasks/${taskId}`}
              className="block truncate text-base font-semibold text-foreground hover:text-primary"
            >
              {title}
            </Link>
          ) : (
            <h3 className="truncate text-base font-semibold text-foreground">
              {title}
            </h3>
          )}
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
            completed
              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900"
              : "bg-red-50 text-red-700 ring-1 ring-red-200 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-900"
          }`}
        >
          {completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">Year:</span> {year}
        </p>
        <p>
          <span className="font-medium text-foreground">Status:</span>{" "}
          <span className={completed ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}>
            {completed ? "Completed" : "Pending"}
          </span>
        </p>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <Button
          type="button"
          onClick={() => toggleCompletion(title)}
          className="bg-[#1a62d6] text-white hover:bg-[#1551b0]"
        >
          Toggle
        </Button>

        <Button
          type="button"
          onClick={() => deleteTask(title)}
          variant="destructive"
          className="bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-500"
        >
          Delete
        </Button>
      </div>
      </CardContent>
    </Card>

  )
}