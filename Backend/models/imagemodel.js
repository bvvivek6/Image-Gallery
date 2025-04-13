const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const ImageSchema = mongoose.Schema(
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
      type: Number,
    },
    publicId: {
      type: String,
    },
  },
  { timestamps: true }
);

const imageModel = mongoose.model("images", ImageSchema);
module.exports = imageModel;
