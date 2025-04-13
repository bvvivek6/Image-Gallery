const uploadMultiple = require("../middleware/imageUpload");
const routes = require("express").Router();

const {
  getAllImages,
  getImage,
  uploadImage,
  deleteImages,
  deleteImage,
} = require("../controllers/imageController");

routes.get("/", getAllImages);
routes.get("/:id", getImage);
routes.delete("/:id", deleteImage);
routes.delete("/", deleteImages);
routes.post("/upload", uploadMultiple, uploadImage);

module.exports = routes;
