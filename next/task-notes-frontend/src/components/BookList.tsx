// import BookCard from "./BookCard"

// export default function BookList() {                // <BookCard> -> Parent class
//   return (
//     <div className="book-list">
//       <BookCard title=" A Book " author=" A " />
//       <BookCard title=" B Book " author=" B " />
//       <BookCard title=" C Book " author=" C " />
//     </div>
//   )
// }



// DRILL -2
import BookCard from "./BookCard"

interface Book {
  title: string
  author: string
  year: number
  available: boolean
}

interface BookListProps {
  books: Book[]
  deleteBook: (title: string) => void
  toggleAvailability: (title: string) => void
}

export default function BookList({
  books,
  deleteBook,
  toggleAvailability
}: BookListProps) {

  return (

    <div>

      {books.map((book, index) => (

        <BookCard
          key={index}
          title={book.title}
          author={book.author}
          year={book.year}
          available={book.available}
          deleteBook={deleteBook}
          toggleAvailability={toggleAvailability}
        />

      ))}

    </div>

  )
}