const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    ts: new Date().toISOString()
  })
})

const users = {
  1: { id: 1, name: "Deekshitha", email: "deekshi@example.com" },
  2: { id: 2, name: "Swati", email: "swati@example.com" }
}

app.get('/users/:id', (req, res) => {
  const user = users[req.params.id]

  if (!user) {
    return res.status(404).json({ error: "User not found " })
  }

  res.json(user)
})

app.post('/echo', (req, res) => {
  res.status(201).json(req.body)
})

app.get('/set-theme-cookie', (req, res) => {
  res.setHeader('Set-Cookie', 'theme=dark; Path=/')
  res.send("Cookie set ")
})

app.listen(3003, () => {
  console.log('Server running at http://localhost:3003')
})