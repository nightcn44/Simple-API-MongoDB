const User = require("../models/userModels");
const hashPassword = require("../utils/hashPassword");

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
    const getUser = await User.findById(userId);

    if (!getUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(getUser);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};

exports.updateUserById = async (req, res) => {
  const userId = req.params.id;
  const { username, password, description } = req.body;

  try {
    const updateData = { username, description };

    if (password) {
      const hashedPassword = await hashPassword(password);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json("Internal server error");
  }
};
