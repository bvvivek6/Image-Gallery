const cloudinary = require("cloudinary").v2;
const imageModel = require("../models/imageModel");

const uploadImage = async (req, res) => {
  try {
    const image = req.files.map((file) => ({
      mimeType: file.mimetype,
      originalName: file.originalname,
      size: file.size,
      imageUrl: file.path,
      publicId: file.filename,
    }));
    const images = await imageModel.insertMany(image);
    res.status(200).json({
      status: " success",
      message: "Image uploaded successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      status: "internal server Error!",
      message: "Image Upload Failed",
      data: err,
      success: false,
    });
  }
};
const getAllImages = async (req, res) => {
  try {
    const images = await imageModel.find({});
    res.status(200).json({
      status: "success",
      message: "Image fetched successfully",
      success: true,
      images,
    });
  } catch (err) {
    res.status(500).json({
      status: "internal server Error!",
      message: "Image Upload Failed",
      data: err,
      success: false,
    });
  }
};
const getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await imageModel.findById(id);
    res.status(200).json({
      status: "success",
      message: "Image fetched successfully",
      success: true,
      image,
    });
  } catch (err) {
    res.status(500).json({
      status: "internal server Error!",
      message: "Image Upload Failed",
      data: err,
      success: false,
    });
  }
};
const deleteImages = async (req, res) => {
  try {
    const images = await imageModel.find({});

    if (images.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No images found to delete",
        success: false,
      });
    }

    // Delete from Cloudinary only if publicId is present
    const deletePromises = images.map((img) => {
      if (img.publicId) {
        return cloudinary.uploader.destroy(img.publicId);
      }
    });

    await Promise.all(deletePromises);

    // Now delete from MongoDB
    await imageModel.deleteMany({});

    res.status(200).json({
      status: "success",
      message: "All images deleted successfully",
      success: true,
    });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({
      status: "internal server Error!",
      message: "Image Deletion Failed",
      data: err.message,
      success: false,
    });
  }
};
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await imageModel.findById(id);
    if (!image) {
      return res.status(404).json({
        status: "fail",
        message: "Image not found",
        success: false,
      });
    }
    // Delete from Cloudinary if publicId exists
    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    // Delete from MongoDB
    await imageModel.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "All images deleted successfully",
      success: true,
    });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({
      status: "internal server Error!",
      message: "Image Deletion Failed",
      data: err.message,
      success: false,
    });
  }
};

module.exports = {
  getAllImages,
  getImage,
  deleteImages,
  deleteImage,
  uploadImage,
};
