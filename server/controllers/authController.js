const { check, validationResult } = require('express-validator/check')
const passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('../models/User')

exports.test = async (req, res) => {
  res.status(200).json({
    message: 'auth route is functional',
  })
}

/**
 * Middleware for validating signup fields
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {string} password2
 */
exports.validateSignup = [
  check('username', 'Please input your username')
    .not()
    .isEmpty(),
  check('email', 'Please input your email address')
    .not()
    .isEmpty(),
  check('password', 'Please input your password')
    .not()
    .isEmpty(),
  check('email', 'Please enter a valid email address').isEmail(),
  check('password', 'Please enter atleast 6 characters').isLength({ min: 6 }),
]

/**
 * Insert a new user to the database
 * @param {string} username
 * @param {string} email
 * @param {string} password
 */
exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const { username, email, password } = req.body

    // Create new user
    const user = new User({
      username,
      email,
      password,
    })

    // Generate a salt
    const salt = await bcrypt.genSalt(10)
    // Hash password with salt
    user.password = await bcrypt.hash(password, salt)
    // Save user
    const newUser = await user.save()

    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ error: err.message || err.toString() })
  }
}

/**
 * Login user
 * @param {string} usernameOrEmail
 * @param {string} password
 */
exports.signin = async (req, res, next) => {
  passport.authenticate('local', { session: true }, (err, user, info) => {
    if (err) {
      return res.status(500).json(err.message)
    }
    if (!user) {
      return res.status(400).json(info.message)
    }

    req.logIn(user, err => {
      if (err) {
        return res.status(500).json(err.message)
      }

      res.json(user)
    })
  })(req, res, next)
}
