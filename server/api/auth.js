const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

router.get('/test', authController.test)
router.post('/signup', authController.validateSignup, authController.signup)
router.post('/signin', authController.signin)

module.exports = router
