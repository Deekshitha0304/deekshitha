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



// import { ReactNode } from "react"

// export default function RootLayout({
//   children
// }: {
//   children: ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body style={{
//         fontFamily: "Arial, sans-serif",
//         backgroundColor: "#f5f5f5",
//         margin: 0
//       }}>

//         <header style={{
//           padding: "3px",
//           borderBottom: "2px solid black",
//           backgroundColor: "#4f46e5",
//           color: "white",
//           textAlign: "center"
//         }}>
//           <h1>My Library App</h1>
//         </header>

//         <div style={{
//           maxWidth: "800px",
//           margin: "35px auto",
//           background: "white",
//           padding: "20px",
//           borderRadius: "60px",
//           boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
//         }}>
//           {children}
//         </div>

//       </body>
//     </html>
//   )
// }


// import { ReactNode } from "react"
// import Link from "next/link"

// export default function RootLayout({
//   children
// }: {
//   children: ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body
//         style={{
//           fontFamily: "Arial, sans-serif",
//           backgroundColor: "#f5f5f5",
//           margin: 0
//         }}
//       >

//         <header
//           style={{
//             padding: "12px 20px",
//             borderBottom: "2px solid black",
//             backgroundColor: "#4f46e5",
//             color: "white",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center"
//           }}
//         >
//           <h2 style={{ margin: 0 }}>Task Notes App</h2>

//           <nav style={{ display: "flex", gap: "20px" }}>

//             <Link href="/" style={{ color: "white", textDecoration: "none" }}>
//               Home
//             </Link>

//             <Link href="/tasks" style={{ color: "white", textDecoration: "none" }}>
//               Tasks
//             </Link>

//             <Link href="/about" style={{ color: "white", textDecoration: "none" }}>
//               About
//             </Link>

//           </nav>
//         </header>

//         <main
//           style={{
//             maxWidth: "800px",
//             margin: "40px auto",
//             background: "white",
//             padding: "20px",
//             borderRadius: "12px",
//             boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
//           }}
//         >
//           {children}
//         </main>

//       </body>
//     </html>
//   )
// }

// READ





import "./globals.css"
import Link from "next/link"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Task Notes App",
  description: "Personal task management application"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900 antialiased`}>

        {/* HEADER */}

        <header className="sticky top-0 z-50 border-b border-slate-800/30 bg-slate-900 text-white shadow-sm">

          <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">

            <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
              Task Notes
            </h1>

            <div className="flex items-center gap-1 sm:gap-2">

              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800/70 hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/tasks"
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800/70 hover:text-white"
              >
                Tasks
              </Link>

              <Link
                href="/about"
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800/70 hover:text-white"
              >
                About
              </Link>

            </div>

          </nav>

        </header>

        {/* PAGE CONTENT */}

        <main className="mx-auto min-h-[calc(100vh-7rem)] w-full max-w-5xl px-4 py-8 sm:px-6">
          {children}
        </main>

        {/* FOOTER */}

        <footer className="border-t border-slate-200 bg-white px-4 py-4 text-center text-sm text-slate-600">
          <p>© 2024 Task Notes App</p>
        </footer>

      </body>
    </html>
  )
}