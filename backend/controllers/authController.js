exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
      let user = await User.findOne({ email });
      if (user) {
          return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({ name, email, password, verificationToken: crypto.randomBytes(20).toString('hex') });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const verificationUrl = `https://www.umlswapme.com/api/auth/verify-email?token=${user.verificationToken}`;
      await sendEmail(user.email, 'Email Verification', `Please verify your email by clicking the link: ${verificationUrl}`);

      res.status(200).json({ msg: 'User registered successfully. Please check your email to verify your account.' });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
  }
};
