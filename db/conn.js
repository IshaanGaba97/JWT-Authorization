const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const {MONGODB_SUCCESS} = require('../constants/constants')
dotenv.config();

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('connected', () => {
  console.log(MONGODB_SUCCESS.bgBlue);
});
