const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const SECRET = 'X8y484hnfinbhfhf';

// Connect to MongoDB
mongoose.connect('mongodb+srv://ishaangaba97:Ishaan%4012345@cluster0.avvjzu4.mongodb.net/', { useNewUrlParser: true, dbName: "credentials"});

// Define mongoose schema for User
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});

const User = mongoose.model('User', userSchema);

// Middleware to authenticate JWT
const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post('/create-user', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {

    const newUser = new User({ username, password: password });
    
    await newUser.save();

    res.json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'User already exists' });
  }
});

app.post('/login-user', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (user) {
      // If the user exists and the password is correct, generate a JWT token
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.get('/validate-user', authenticateJwt, (req, res) => {
  res.json({
    message: 'Token is valid',
    username: req.user.username
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});