require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in the .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
