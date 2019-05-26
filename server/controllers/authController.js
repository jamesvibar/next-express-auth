const { check, validationResult } = require('express-validator/check')
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
    const salt = await bcrypt.genSalt(10);
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
 * Middleware for validating signup fields
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {string} password2
 */
exports.validateLogin = [
  check('email', 'Please input your email address')
    .not()
    .isEmpty(),
  check('password', 'Please input your password')
    .not()
    .isEmpty()
]

/**
 * Login user
 * @param {string} usernameOrEmail
 * @param {string} password
 */
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })

    res.json(user);

  } catch (err) {
    res.status(400).json({ error: err.message || err.toString() })
  }
}