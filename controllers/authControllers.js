const User = require("../models/User");
const hashPassword = require("../utils/hashPassword");
const validatePassword = require("../utils/validatePassword");
const generateToken = require("../utils/jwtUtils");

exports.register = async (req, res) => {
  const { username, password, description } = req.body;

  if (!username || !password || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username is already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      password: hashedPassword,
      description,
    });

    await newUser.save();

    res.status(201).json({ message: "Register success" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json("Internal server error");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({ error: "Username not found" });
    }

    const isMatch = await validatePassword(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = generateToken(existingUser);

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};

exports.getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.json({
      id: req.user.id,
      username: req.user.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};
