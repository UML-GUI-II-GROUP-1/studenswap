const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema with fields for name, email, password, isVerified, and verificationToken
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt timestamps
});

// Middleware to hash the password before saving a new user or updating the password
userSchema.pre('save', async function (next) {
  // Check if the password field has been modified
  if (!this.isModified('password')) {
    return next(); // If not, move to the next middleware
  }
  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Proceed to save the user
});

// Method to compare entered password with hashed password stored in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
