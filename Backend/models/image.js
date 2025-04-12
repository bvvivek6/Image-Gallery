const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const schema = mongoose.Schema(
  {
    imageUrl: {
      type: String,
    },
    originalName: {
      type: String,
    },
    mimeType: {
      type: String,
    },
    size: {
      type: String,
    },
  },
  { timestamps: true }
);

const imageModel = mongoose.model();
