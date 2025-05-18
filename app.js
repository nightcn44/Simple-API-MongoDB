const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { readdirSync } = require("fs");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();

connectDB();

app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(cors());

// readdirSync("./routes").map((file) => {
//   if (file.endsWith(".js")) {
//     try {
//       app.use("/api", require("./routes/" + file));
//       console.log(`Loading route: ${file}`);
//     } catch (err) {
//       console.log(`Error loading route ${file}:`, err);
//     }
//   }
// });

app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ message: "Something went wrong" });
});

module.exports = app;
