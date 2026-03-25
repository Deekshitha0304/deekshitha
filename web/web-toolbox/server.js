// const express = require('express')
// const app = express()

// app.get('/', (req, res) => {
//   res.send('<h1>Hello Deekshitha </h1>')
// })

// app.get('/api/ping', (req, res) => {
//   res.json({ ok: true, time: new Date().toISOString() })
// })

// app.listen(3001, () => {
//   console.log('Server running on http://localhost:3001')
// })





const express = require('express')
const app = express()

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'))

// API route
app.get('/api/ping', (req, res) => {
  res.json({ ok: true })
})

// Redirect
app.get('/old-home', (req, res) => {
  res.redirect(302, '/')
})

// Custom 404
app.use((req, res) => {
  res.status(404).send('<h2>404 - Not Found </h2>')
})

app.listen(3001, () => {
  console.log('Server running at http://localhost:3001')
})