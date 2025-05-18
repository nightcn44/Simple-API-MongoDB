const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    console.log("Hashing Error:", err);
    throw new Error("Error hashing password");
  }
};

module.exports = hashPassword;
