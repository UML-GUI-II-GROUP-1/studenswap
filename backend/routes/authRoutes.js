const express = require('express');
const router = express.Router();
const { register, login, verifyEmail } = require('../controllers/authController');

// Signup route
router.post('/signup', register);

// Verify email route
router.get('/verify-email', verifyEmail);

// Login route
router.post('/login', login);

module.exports = router;
