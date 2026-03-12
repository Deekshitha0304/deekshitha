// export async function GET() {

//   const books = [

//     { title: "Book A", author: "Author A", year: 2001, available: true },

//     { title: "Book B", author: "Author B", year: 2002, available: false }

//   ]

//   return Response.json(books)

// }



export async function GET() {

  const tasks = [
    {
      id: "1",
      title: "Learn Next.js Routing",
      description: "Understand file-based routing",
      year: 2024,
      completed: false
    },
    {
      id: "2",
      title: "Build Task UI",
      description: "Create components and forms",
      year: 2024,
      completed: true
    }
  ]

  return Response.json(tasks)
}