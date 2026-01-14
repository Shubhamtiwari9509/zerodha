const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../schemas/user.js");
require("dotenv").config();
const FRONTEND_URL=process.env.FRONTEND_URL;

const router = express.Router();

//  generate JWT
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//  GET Signup  
router.get("/signup", (req, res) => {
 res.redirect(`${FRONTEND_URL}/signup`);
});

//  POST Signup
router.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken({ userName, email });
    return res.status(201).json({ message: "Successfully registered", token });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

//  GET Login  
router.get("/login", (req, res) => {
 res.redirect(`${FRONTEND_URL}/login`);
});

//  POST Login
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    if (!userName || !password) {
      return res.status(400).json({ message: "Please enter the info" });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = generateToken({ userName, email: user.email });
    return res.status(200).json({ message: "Successfully logged in", token });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

module.exports = router;