require("dotenv").config();

const mongoose = require("mongoose");

const DB = async () => {
  if (!process.env.MONGO_URI) {
    console.log("❌ MONGO_URI is not defined in the .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.log("❌ Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = DB;
