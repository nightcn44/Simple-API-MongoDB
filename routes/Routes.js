const express = require("express");
const router = express.Router();
const Auth = require("../controllers/authControllers");
const User = require("../controllers/userControllers");
const { auth } = require("../middleware/authmiddleware");

router.get("/users", auth, User.getAllUsers);
router.get("/user/:id", auth, User.getUserById);
router.put("/user/:id", auth, User.updateUserById);
router.delete("/user/:id", auth, User.deleteUserById);

router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.get("/me", auth, Auth.getMe);

module.exports = router;
