const express = require('express')
const app = express()
const port = 3001

app.post('/posts/search', (req, res) => {
  res.json([
    { label: 'First post', value: 'post-id-1' },
    { label: 'Second post', value: 'post-id-2' },
    { label: 'Third post', value: 'post-id-3' },
  ])
})

app.post('/posts/html', (req, res) => {
  res.json({ html: '<div>It works!</div>' })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
