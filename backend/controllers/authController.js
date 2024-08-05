const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../config/email');
const crypto = require('crypto');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      verificationToken: crypto.randomBytes(20).toString('hex')
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const verificationUrl = `https://www.umlswapme.com/api/auth/verify-email?token=${user.verificationToken}`;
    await sendEmail(user.email, 'Email Verification', `Please verify your email by clicking the link: ${verificationUrl}`);

    res.status(200).json({ msg: 'Registration successful. Please verify your email.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.query.token });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ msg: 'Email verified successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ msg: 'Email not verified' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
