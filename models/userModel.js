const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
});

const User = new mongoose.model('User', userSchema);

module.exports = User;