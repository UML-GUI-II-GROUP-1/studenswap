const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
  console.log('Root route accessed');
  res.send('Welcome to the StudentSwap API');
});

// Status route
app.get('/api/status', (req, res) => {
  res.send('API is working');
});

// Health route
app.get('/api/health', (req, res) => {
  res.send('API is healthy');
});

// Users route
app.get('/api/users', (req, res) => {
  // Dummy user data for now
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
  ];
  res.json(users);
});

// API Routes
app.use('/api/auth', authRoutes); // Mount with /auth prefix

// Catch-all route for undefined paths
app.use((req, res, next) => {
  console.log('Undefined route accessed');
  res.status(404).send('Sorry, the resource you are looking for does not exist.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
