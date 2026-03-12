// // import BookCard from "./BookCard"

// // export default function BookList() {                // <BookCard> -> Parent class
// //   return (
// //     <div className="book-list">
// //       <BookCard title=" A Book " author=" A " />
// //       <BookCard title=" B Book " author=" B " />
// //       <BookCard title=" C Book " author=" C " />
// //     </div>
// //   )
// // }



// // DRILL -2
// import BookCard from "./TaskCard"

// interface Book {
//   title: string
//   author: string
//   year: number
//   available: boolean
// }

// interface BookListProps {
//   books: Book[]
//   deleteBook: (title: string) => void
//   toggleAvailability: (title: string) => void
// }

// export default function BookList({
//   books,
//   deleteBook,
//   toggleAvailability
// }: BookListProps) {

//   return (

//     <div>

//       {books.map((book, index) => (

//         <BookCard
//           key={index}
//           title={book.title}
//           author={book.author}
//           year={book.year}
//           available={book.available}
//           deleteBook={deleteBook}
//           toggleAvailability={toggleAvailability}
//         />

//       ))}

//     </div>

//   )
// }


import TaskCard from "./TaskCard"

interface Task {
  id: string
  title: string
  description: string
  year: number
  completed: boolean
}

interface TaskListProps {
  tasks: Task[]
  deleteTask: (title: string) => void
  toggleCompletion: (title: string) => void
}

export default function TaskList({
  tasks,
  deleteTask,
  toggleCompletion
}: TaskListProps) {
  return (
    <div className="mt-6 space-y-3">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          taskId={task.id}
          title={task.title}
          description={task.description}
          year={task.year}
          completed={task.completed}
          deleteTask={deleteTask}
          toggleCompletion={toggleCompletion}
        />
      ))}
    </div>
  )
}