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
import { cn } from "@/src/lib/utils"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface TaskFormProps {
  addTask: (title: string, description: string, year: number) => void
}

export default function TaskForm({ addTask }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [year, setYear] = useState("")
  const [formError, setFormError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState({
    title: false,
    description: false,
    year: false
  })

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()
    const parsedYear = Number(year)

    const nextFieldErrors = {
      title: trimmedTitle.length === 0,
      description: trimmedDescription.length === 0,
      year: !Number.isFinite(parsedYear) || parsedYear <= 0
    }

    if (nextFieldErrors.title || nextFieldErrors.description || nextFieldErrors.year) {
      setFieldErrors(nextFieldErrors)
      setFormError("Invalid details. Please fill in all required fields.")
      return
    }

    setFieldErrors({ title: false, description: false, year: false })
    setFormError(null)

    addTask(trimmedTitle, trimmedDescription, parsedYear)

    setTitle("")
    setDescription("")
    setYear("")
  }

  return (
    <form id="create-task-form" onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="task-title">
          Title
        </Label>
        <Input
          id="task-title"
          placeholder="e.g. Finish homework"
          value={title}
          onChange={e => {
            const value = e.target.value
            setTitle(value)
            if (fieldErrors.title && value.trim().length > 0) {
              setFieldErrors(prev => ({ ...prev, title: false }))
            }
            if (formError && value.trim().length > 0) {
              setFormError(null)
            }
          }}
          className={cn(fieldErrors.title && "border-destructive focus-visible:ring-destructive/40")}
        />
        {fieldErrors.title && (
          <p className="text-xs text-destructive">Title is required.</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="task-description">
          Description
        </Label>
        <Input
          id="task-description"
          placeholder="Add a short description"
          value={description}
          onChange={e => {
            const value = e.target.value
            setDescription(value)
            if (fieldErrors.description && value.trim().length > 0) {
              setFieldErrors(prev => ({ ...prev, description: false }))
            }
            if (formError && value.trim().length > 0) {
              setFormError(null)
            }
          }}
          className={cn(fieldErrors.description && "border-destructive focus-visible:ring-destructive/40")}
        />
        {fieldErrors.description && (
          <p className="text-xs text-destructive">Description is required.</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="task-year">
          Year
        </Label>
        <Input
          id="task-year"
          placeholder="2026"
          type="number"
          value={year}
          onChange={e => {
            const value = e.target.value
            setYear(value)
            const parsedYear = Number(value)
            if (fieldErrors.year && Number.isFinite(parsedYear) && parsedYear > 0) {
              setFieldErrors(prev => ({ ...prev, year: false }))
            }
            if (formError && Number.isFinite(parsedYear) && parsedYear > 0) {
              setFormError(null)
            }
          }}
          className={cn(fieldErrors.year && "border-destructive focus-visible:ring-destructive/40")}
        />
        {fieldErrors.year && (
          <p className="text-xs text-destructive">Year is required and must be valid.</p>
        )}
      </div>

      {formError && (
        <p className="text-sm font-medium text-destructive">{formError}</p>
      )}
    </form>
  )
}