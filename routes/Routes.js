const express = require("express");
const router = express.Router();
const Auth = require("../controllers/authControllers");
const User = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authmiddleware");

router.get("/users", authMiddleware, User.getAllUsers);
router.get("/user/:id", authMiddleware, User.getUserById);
router.put("/user/:id", authMiddleware, User.updateUserById);
router.delete("/user/:id", authMiddleware, User.deleteUserById);

router.post("/register", Auth.register);
router.post("/login", Auth.login);
// router.get("/me", authMiddleware, user.getMe);

module.exports = router;
