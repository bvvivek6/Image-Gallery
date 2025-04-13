require("dotenv").config();
const mongoose = require("mongoose");

const DB_URL = process.env.MONGODB_URI;

// Connection establishment
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err.message);
  });
