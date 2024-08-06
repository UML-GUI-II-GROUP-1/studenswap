const express = require('express');
const router = express.Router();
const { register, login, verifyEmail } = require('../controllers/authController');

router.post('/signup', register);
router.get('/verify-email', verifyEmail);
router.post('/login', login);

module.exports = router;
