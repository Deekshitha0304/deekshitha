// "use client"

// import { useState } from "react"
// import type { SubmitEvent } from "react"

// interface BookFormProps {
//   addBook: (title: string, author: string, year: number) => void
// }

// export default function BookForm({ addBook }: BookFormProps) {

//   const [title, setTitle] = useState("")
//   const [author, setAuthor] = useState("")
//   const [year, setYear] = useState("")

//   function handleSubmit(e: SubmitEvent) {
//     e.preventDefault()

//     addBook(title, author, Number(year))

//     setTitle("")
//     setAuthor("")
//     setYear("")
    
//   }

//   return (
//     <form onSubmit={handleSubmit}>

//       <input
//         placeholder="Book Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         style={{ }}
//       />

//       <input
//         placeholder="Author"
//         value={author}
//         onChange={(e) => setAuthor(e.target.value)}
//       />

//       <input
//         placeholder="Year"
//         type="number"
//         value={year}
//         onChange={(e) => setYear(e.target.value)}
//       />

//       <button
//         type="submit"
//         style={{
//                 padding: "8px 18px",
//                 background: "#6f6e7a",
//                 border: "none",
//                 borderRadius: "5px",
//                 color: "white",
//                 cursor: "pointer",
//                 height:30
//         }}
//         >
//             Add Book
//         </button>
    
//     </form>
//   )
// }



"use client"

import { useState } from "react"
import type { SubmitEvent } from "react"

interface TaskFormProps {
  addTask: (title: string, description: string, year: number) => void
}

export default function TaskForm({ addTask }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [year, setYear] = useState("")

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    addTask(title, description, Number(year))

    setTitle("")
    setDescription("")
    setYear("")
  }

  return (
    <form id="create-task-form" onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="task-title" className="text-sm font-medium text-slate-800">
          Title
        </label>
        <input
          id="task-title"
          placeholder="e.g. Finish homework"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="task-description" className="text-sm font-medium text-slate-800">
          Description
        </label>
        <input
          id="task-description"
          placeholder="Add a short description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="task-year" className="text-sm font-medium text-slate-800">
          Year
        </label>
        <input
          id="task-year"
          placeholder="2026"
          type="number"
          value={year}
          onChange={e => setYear(e.target.value)}
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
        />
      </div>
    </form>
  )
}