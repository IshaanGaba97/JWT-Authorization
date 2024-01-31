const User = require("../models/userModel");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const {
  CREDENTIALS_REQUIRED,
  INVALID_CREDENTIALS,
  VALID_TOKEN,
  LOGIN_SUCCESS,
  USER_EXIST,
  LOGIN_ERROR,
  USER_CREATED_SUCCESS,
  INTERNAL_SERVER_ERROR,
} = require("../constants/constants");

dotenv.config();

const SECRET = process.env.SECRET;
const SECRET_KEY_EXPIRY = process.env.SECRET_KEY_EXPIRY;
const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ message: CREDENTIALS_REQUIRED });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: USER_EXIST });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();
    
    res.json({ message: USER_CREATED_SUCCESS });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: CREDENTIALS_REQUIRED });
    }

    const user = await User.findOne({ username });

    if (user) {
      const token = jwt.sign({ username, role: "user" }, SECRET, {
        expiresIn: SECRET_KEY_EXPIRY,
      });
      res.json({ message: LOGIN_SUCCESS, token });
    } else {
      res.status(403).json({ message: INVALID_CREDENTIALS });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: LOGIN_ERROR });
  }
};

const validateUser = async (req, res) => {
  res.json({
    message: VALID_TOKEN,
    username: req.user.username,
  });
};

module.exports = { createUser, loginUser, validateUser };
