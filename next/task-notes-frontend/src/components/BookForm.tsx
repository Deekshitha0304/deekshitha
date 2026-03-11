"use client"

import { useState } from "react"
import type { SubmitEvent } from "react"

interface BookFormProps {
  addBook: (title: string, author: string, year: number) => void
}

export default function BookForm({ addBook }: BookFormProps) {

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [year, setYear] = useState("")

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    addBook(title, author, Number(year))

    setTitle("")
    setAuthor("")
    setYear("")
    
  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ }}
      />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        placeholder="Year"
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <button
        type="submit"
        style={{
                padding: "8px 18px",
                background: "#6f6e7a",
                border: "none",
                borderRadius: "5px",
                color: "white",
                cursor: "pointer",
                height:30
        }}
        >
            Add Book
        </button>
    
    </form>
  )
}