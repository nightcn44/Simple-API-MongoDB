const express = require("express");
const router = express.Router();
const User = require("../controllers/authControllers");
// const { authMiddleware } = require("../middleware/authmiddleware");

// router.get("/users", authMiddleware, user.getAllUsers);
// router.get("/user/:id", authMiddleware, user.getUserById);
// router.put("/user/:id", authMiddleware, user.updateUserById);
// router.delete("/user/:id", authMiddleware, user.deleteUserById);

router.post("/register", User.register);
router.post("/login", User.login);
// router.get("/me", authMiddleware, user.getMe);

module.exports = router;
