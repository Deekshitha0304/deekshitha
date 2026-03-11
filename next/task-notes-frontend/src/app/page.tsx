// import BookList from "../components/BookList"

// export default function Home() {
//   return (
//     <main>
//       <h1>My Book Library</h1>
//       <BookList />
//     </main>
//   )
// }




//DRILL-2

// import BookList from "../components/BookList"

// export default function HomePage() {

//   const books = [
//     { title: "Book A", author: "Author A", year: 2001 },
//     { title: "Book B", author: "Author B", year: 2002 },
//     { title: "Book C", author: "Author C", year: 2003 }
//   ]

//   return (
//     <main style={{ padding: "20px" }}>

//       <h1>Library</h1>

//       <BookList books={books} />

//     </main>
//   )
// }



// DRILL - 3
"use client"

import { useState, useEffect } from "react"
import BookList from "../components/BookList"
import Counter from "../components/Counter"
import BookForm from "../components/BookForm"

interface Book {
  title: string
  author: string
  year: number
  available: boolean
}

export default function HomePage() {

  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/books")
        if (!response.ok) {
          throw new Error("Failed to fetch books")
        }
        const data = await response.json()
        setBooks(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    loadBooks()

  }, [])

  useEffect(() => {

    const savedBooks = localStorage.getItem("books")

    if (savedBooks) {
      setBooks(JSON.parse(savedBooks))
    }

  }, [])

  useEffect(() => {

    localStorage.setItem("books", JSON.stringify(books))

  }, [books])



  function addBook(title: string, author: string, year: number) {

    const newBook: Book = {
      title,
      author,
      year,
      available: true
    }

    setBooks([...books, newBook])

  }



  function deleteBook(title: string) {

    if (confirm("Delete this book?")) {

      setBooks(books.filter(book => book.title !== title))

    }

  }



  function toggleAvailability(title: string) {

    const updatedBooks = books.map(book =>
      book.title === title
        ? { ...book, available: !book.available }
        : book
    )

    setBooks(updatedBooks)

  }



  const filteredBooks = books
    .filter(book =>
      book.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(book => {

      if (statusFilter === "available") return book.available

      if (statusFilter === "unavailable") return !book.available

      return true

    })



  if (loading) return <div>Loading books...</div>

  if (error) return <div>Error: {error}</div>



  return (

    <main>

      <h2>Library</h2>



      <input
        placeholder="Search book..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "60%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "60px",
          border: "1px solid black"
        }}
      />



      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="all">All</option>
        <option value="available">Available</option>
        <option value="unavailable">Not Available</option>
      </select>



      <BookList
        books={filteredBooks}
        deleteBook={deleteBook}
        toggleAvailability={toggleAvailability}
      />
      <BookForm addBook={addBook} />

      <Counter />

    </main>

  )
}