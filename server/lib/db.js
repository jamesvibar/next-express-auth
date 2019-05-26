const mongoose = require('mongoose')

// Connect to mongodb database
const connectDatabase = async () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function() {
    console.log('Connected to mongodb database')
  })
}

module.exports = connectDatabase
