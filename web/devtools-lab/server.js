const express = require('express')
const app = express()

app.use(express.static('public'))

// API with error mode + header
app.get('/api/user', (req, res) => {
  if (req.query.fail === '1') {
    return res.status(500).json({ error: 'Server failed ' })
  }

  res.setHeader('X-Debug-Trace', 'trace-12345')

  res.json({
    name: 'Deekshitha',
    email: 'deekshi@example.com'
  })
})

app.listen(3002, () => {
  console.log('http://localhost:3002')
})