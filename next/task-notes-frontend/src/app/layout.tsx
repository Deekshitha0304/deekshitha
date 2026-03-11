// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body>
//         {children}
//       </body>
//     </html>
//   )
// }



// DRILL - 2

// import { ReactNode } from "react"

// export default function RootLayout({
//   children
// }: {
//   children: ReactNode
// }) {

//   return (
//     <html lang="en">
//       <body>

//         <header style={{
//           padding: "15px",
//           borderBottom: "1px solid blue"
//         }}>
//           <h1>My Library App</h1>
//         </header>

//         {children}

//       </body>
//     </html>
//   )
// }



import { ReactNode } from "react"

export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        margin: 0
      }}>

        <header style={{
          padding: "3px",
          borderBottom: "2px solid black",
          backgroundColor: "#4f46e5",
          color: "white",
          textAlign: "center"
        }}>
          <h1>My Library App</h1>
        </header>

        <div style={{
          maxWidth: "800px",
          margin: "35px auto",
          background: "white",
          padding: "20px",
          borderRadius: "60px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          {children}
        </div>

      </body>
    </html>
  )
}