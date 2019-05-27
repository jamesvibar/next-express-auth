const express = require('express')
const next = require('next')
const api = require('./api')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const connectDatabase = require('./lib/db')
const bcrypt = require('bcrypt')
const User = require('./models/User')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

const app = next({ dev })
const handle = app.getRequestHandler()

// Get .env variables if development
if (dev) {
  require('dotenv').config()
}

// Connect to MongoDB database
connectDatabase()

// Setup passport local strategy

const newLocalStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
}

const newLocalStrategy = new LocalStrategy(
  newLocalStrategyOptions,
  async (username, password, done) => {
    try {
      // Find the username
      const user = await User.findOne({
        email: username, // username: username
      })

      // User not found
      if (!user) {
        return done(null, false, {
          message: 'Username not found',
        })
      }

      console.log('outside bcrypt')
      console.log(`password: ${password}`)
      console.log(`hash: ${user.password}`)
      const match = await bcrypt.compare(password, user.password)

      if (!match) {
        return done(null, false, {
          message: 'Incorrect password',
        })
      } else {
        return done(null, user)
      }
    } catch (err) {
      done(null, false, {
        message: 'Failed',
      })
    }
  }
)

passport.use(newLocalStrategy)

passport.serializeUser((user, done) => {
  return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    })

    if (!user) {
      return done(null, false, { message: 'User does not exist' })
    }

    return done(null, user)
  } catch (err) {
    return done(null, false, { message: 'Failed' })
  }
})

app.prepare().then(async () => {
  const server = express()

  server.use(express.json())
  server.use(express.urlencoded({ extended: false }))

  // Add passport middleware
  server.use(passport.initialize())

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
