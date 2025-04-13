const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Connect to Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images", // The folder in Cloudinary
    format: async (req, file) => "png", // Correct key: "format"
    public_id: (req, file) => {
      return file.originalname.split(".")[0];
    },
  },
});

// Configure the multer storage
const cloudinaryFileUploader = multer({ storage });
const uploadMultiple = cloudinaryFileUploader.array("images", 10); // Accept up to 10 files

module.exports = uploadMultiple;
