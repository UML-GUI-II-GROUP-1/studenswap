const express = require('express');
const router = express.Router();
const { register, verifyEmail, login } = require('../controllers/authController');

router.post('/signup', register);
router.get('/verify-email', verifyEmail);
router.post('/login', login);

module.exports = router;
