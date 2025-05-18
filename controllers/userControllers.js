const User = require("../models/user");
// const hashPassword = require("../utils/hashPassword");
// const validatePassword = require("../utils/validatePassword");
// const { generateToken } = require("../utils/jwtUtils");

exports.getAllUsers = async (req, res) => {
  try {
    const data = await User.find({}).exec();

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const getuser = await User.findById(userId);

    if (!getuser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(getuser);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};

exports.updateUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const updateData = {};

    if (req.body.username) updateData.username = req.body.username;
    if (req.body.email) updateData.email = req.body.email;

    if (req.body.password && req.body.password.trim() !== "") {
      updateData.password = await hashPassword(req.body.password);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(400).json("Internal server error");
  }
};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json("Internal server error");
  }
};
