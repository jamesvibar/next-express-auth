const { check, validationResult } = require('express-validator/check')
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
  check('password2', 'Please confirm your password')
    .not()
    .isEmpty(),
  check('email', 'Please enter a valid email address').isEmail(),
  check('password', 'Please enter atleast 6 characters').isLength({ min: 6 }),
  check('password2', 'Your password does not match').custom(
    (value, { req }) => value === req.body.password
  ),
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

    const newUser = new User({
      username,
      email,
      password,
    })

    const user = await newUser.save()
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message || err.toString() })
  }
}
