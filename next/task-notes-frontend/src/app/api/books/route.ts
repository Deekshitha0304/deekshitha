export async function GET() {

  const books = [

    { title: "Book A", author: "Author A", year: 2001, available: true },

    { title: "Book B", author: "Author B", year: 2002, available: false }

  ]

  return Response.json(books)

}