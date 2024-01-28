const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('connected', () => {
  console.log('MongoDB connected successfully');
});
