const express = require('express')
const mongoose = require('mongoose')
const next = require('next')
const api = require('./api')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

const app = next({ dev })
const handle = app.getRequestHandler()

// Connect to mongodb database
mongoose.connect('mongodb://localhost:27017/next-express-auth', {
  useNewUrlParser: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connected to mongodb database')
})

app.prepare().then(async () => {
  const server = express()

  server.use(express.json())

  // Create api routes
  api(server)

  // Give all nextjs requests to server
  server.get('*', (req, res) => {
    handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`Ready on port ${port}`)
  })
})
