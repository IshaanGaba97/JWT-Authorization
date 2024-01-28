const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authenticateJwt = require("../middlewares/authenticate");

dotenv.config();

const SECRET = process.env.SECRET;

router.post("/create-user", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const newUser = new User({ username, password: password });

    await newUser.save();

    res.json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "User already exists" });
  }
});

router.post("/login-user", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      const token = jwt.sign({ username, role: "user" }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Logged in successfully", token });
    } else {
      res.status(403).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

router.get("/validate-user", authenticateJwt, (req, res) => {
  res.json({
    message: "Token is valid",
    username: req.user.username,
  });
});

module.exports = router;
