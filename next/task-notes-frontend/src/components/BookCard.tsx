"use client"

interface BookCardProps {
  title: string
  author: string
  year: number
  available: boolean
  deleteBook: (title: string) => void
  toggleAvailability: (title: string) => void
}

export default function BookCard({
  title,
  author,
  year,
  available,
  deleteBook,
  toggleAvailability
}: BookCardProps) {

  return (

    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "8px",
        background: "#fafafa",
        position: "relative"
      }}
    >

      <h3>{title}</h3>

      <p>by {author}</p>

      <p>Year: {year}</p>



      <p
        style={{
          color: available ? "#277a04" : "#d11322",
          fontWeight: "bold"
        }}
      >
        Status: {available ? "Available" : "Not Available"}
      </p>



      <button
        onClick={() => toggleAvailability(title)}
        style={{
          position: "absolute",
          right: "15px",
          top: "40%",
          padding: "6px 10px",
          borderRadius: "5px",
          border: "none",
          background: available ? "#277a04" : "#d11322",
          color: "white",
          cursor: "pointer"
        }}
      >
        Toggle
      </button>



      <button
        onClick={() => deleteBook(title)}
        style={{
          position: "absolute",
          right: "15px",
          bottom: "10px",
          background: "#d11322",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Delete
      </button>

    </div>

  )
}