// // import BookList from "../components/BookList"

// // export default function Home() {
// //   return (
// //     <main>
// //       <h1>My Book Library</h1>
// //       <BookList />
// //     </main>
// //   )
// // }




// //DRILL-2

// // import BookList from "../components/BookList"

// // export default function HomePage() {

// //   const books = [
// //     { title: "Book A", author: "Author A", year: 2001 },
// //     { title: "Book B", author: "Author B", year: 2002 },
// //     { title: "Book C", author: "Author C", year: 2003 }
// //   ]

// //   return (
// //     <main style={{ padding: "20px" }}>

// //       <h1>Library</h1>

// //       <BookList books={books} />

// //     </main>
// //   )
// // }



// // DRILL - 3
// "use client"

// import { useState, useEffect } from "react"
// import BookList from "../components/BookList"
// import Counter from "../components/Counter"
// import BookForm from "../components/BookForm"

// interface Book {
//   title: string
//   author: string
//   year: number
//   available: boolean
// }

// export default function HomePage() {

//   const [books, setBooks] = useState<Book[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   const [search, setSearch] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")

//   useEffect(() => {
//     const loadBooks = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch("/api/books")
//         if (!response.ok) {
//           throw new Error("Failed to fetch books")
//         }
//         const data = await response.json()
//         setBooks(data)
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Unknown error")
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadBooks()

//   }, [])

//   useEffect(() => {

//     const savedBooks = localStorage.getItem("books")

//     if (savedBooks) {
//       setBooks(JSON.parse(savedBooks))
//     }

//   }, [])

//   useEffect(() => {

//     localStorage.setItem("books", JSON.stringify(books))

//   }, [books])



//   function addBook(title: string, author: string, year: number) {

//     const newBook: Book = {
//       title,
//       author,
//       year,
//       available: true
//     }

//     setBooks([...books, newBook])

//   }



//   function deleteBook(title: string) {

//     if (confirm("Delete this book?")) {

//       setBooks(books.filter(book => book.title !== title))

//     }

//   }



//   function toggleAvailability(title: string) {

//     const updatedBooks = books.map(book =>
//       book.title === title
//         ? { ...book, available: !book.available }
//         : book
//     )

//     setBooks(updatedBooks)

//   }



//   const filteredBooks = books
//     .filter(book =>
//       book.title.toLowerCase().includes(search.toLowerCase())
//     )
//     .filter(book => {

//       if (statusFilter === "available") return book.available

//       if (statusFilter === "unavailable") return !book.available

//       return true

//     })



//   if (loading) return <div>Loading books...</div>

//   if (error) return <div>Error: {error}</div>



//   return (

//     <main>

//       <h2>Library</h2>



//       <input
//         placeholder="Search book..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         style={{
//           width: "60%",
//           padding: "10px",
//           marginBottom: "10px",
//           borderRadius: "60px",
//           border: "1px solid black"
//         }}
//       />



//       <select
//         value={statusFilter}
//         onChange={(e) => setStatusFilter(e.target.value)}
//         style={{ marginLeft: "10px" }}
//       >
//         <option value="all">All</option>
//         <option value="available">Available</option>
//         <option value="unavailable">Not Available</option>
//       </select>



//       <BookList
//         books={filteredBooks}
//         deleteBook={deleteBook}
//         toggleAvailability={toggleAvailability}
//       />
//       <BookForm addBook={addBook} />

//       <Counter />

//     </main>

//   )
// }

"use client"

import { useState, useEffect } from "react"
import TaskList from "../../components/TaskList"
import Counter from "../../components/Counter"
import TaskForm from "../../components/TaskForm"
import LoadingSpinner from "../../components/LoadingSpinner"
import Modal from "../../components/Modal"

interface Task {
  id: string
  title: string
  description: string
  year: number
  completed: boolean
}

type StoredTask = Omit<Task, "id"> & { id?: string }

function withTaskIds(taskList: StoredTask[]): Task[] {
  return taskList.map((task, index) => ({
    ...task,
    id: task.id ?? (Date.now() + index).toString()
  }))
}

export default function HomePage() {

  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {

    const loadTasks = async () => {

      try {

        const savedTasks = localStorage.getItem("tasks")
        if (savedTasks) {
          try {
            const parsed = JSON.parse(savedTasks)
            if (Array.isArray(parsed) && parsed.length > 0) {
              setTasks(withTaskIds(parsed as StoredTask[]))
              setLoading(false)
              return
            }
          } catch {
            // If stored data is invalid, ignore it and fetch from API.
          }
        }

        setLoading(true)

        const response = await fetch("/api/tasks")

        if (!response.ok) {
          throw new Error("Failed to fetch tasks")
        }

        const data = await response.json()

        if (Array.isArray(data)) {
          setTasks(withTaskIds(data as StoredTask[]))
        }

      } catch (err) {

        setError(err instanceof Error ? err.message : "Unknown error")

      } finally {

        setLoading(false)

      }

    }

    loadTasks()

  }, [])

  useEffect(() => {

    const savedTasks = localStorage.getItem("tasks")

    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTasks(withTaskIds(parsed as StoredTask[]))
        }
      } catch {
        // If stored data is invalid, ignore it.
      }
    }

  }, [])

  useEffect(() => {

    localStorage.setItem("tasks", JSON.stringify(tasks))

  }, [tasks])



  function addTask(title: string, description: string, year: number) {

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      year,
      completed: false
    }

    setTasks([...tasks, newTask])

    setIsModalOpen(false)
    setSuccessMessage("✔ Task created successfully")
    window.setTimeout(() => setSuccessMessage(null), 2500)

  }



  function deleteTask(title: string) {

    if (confirm("Delete this task?")) {
      setTasks(tasks.filter(task => task.title !== title))
    }

  }



  function toggleCompletion(title: string) {

    const updatedTasks = tasks.map(task =>
      task.title === title
        ? { ...task, completed: !task.completed }
        : task
    )

    setTasks(updatedTasks)

  }



  const filteredTasks = tasks
    .filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(task => {

      if (statusFilter === "completed") return task.completed

      if (statusFilter === "pending") return !task.completed

      return true

    })



  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        <span className="font-medium">Error:</span> {error}
      </div>
    )
  }



  return (

    <main className="mx-auto max-w-5xl">

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Tasks
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Create tasks, search quickly, and mark them as completed.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Add Task
        </button>
      </div>

      {successMessage && (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
        >
          {successMessage}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <label className="sr-only" htmlFor="task-search">
            Search tasks
          </label>
          <input
            id="task-search"
            placeholder="Search task..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div className="sm:w-56">
          <label className="sr-only" htmlFor="task-filter">
            Filter tasks
          </label>
          <select
            id="task-filter"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>



      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleCompletion={toggleCompletion}
      />



      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <TaskForm addTask={addTask} />
      </Modal>



      <Counter />

      </div>

    </main>

  )
}