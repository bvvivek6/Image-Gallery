import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    try {
      const images = await fetch("http://localhost:3000/api/images");
      const data = await images.json();
      console.log(data);
      setImages(data.images);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const file = e.target.files;
    if (!file.length) return;
    const formdata = new FormData();
    for (let i = 0; i < file.length; i++) {
      formdata.append("images", file[i]); // 🔥 the key here must match multer's field name
    }

    try {
      const res = await fetch("http://localhost:3000/api/images/upload", {
        method: "POST",
        body: formdata,
      });
      setLoading(false);
      if (res.ok) {
        toast.success("Image Uploaded Successfully!", {
          position: "top-center",
        });
        fetchImages();
      }
    } catch (err) {
      console.log(err);
      toast.error("Erro Uploading");
    }
  };

  const deleteImage = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/api/images/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Image Deleted Successfully");
        setImages((prev) => prev.filter((img) => img._id !== id));
      } else {
        const error = await res.json();
        toast.error(error.message || "Error deleting image");
        console.log(error);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting image");
    }
  };

  const deleteAllImages = async () => {
    const confirmDelete = window.confirm(
      "Are sure you want to delete all the images?"
    );
    if (!confirmDelete) return;
    try {
      const res = await fetch("http://localhost:3000/api/images", {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("All Images Deleted Successfully");
        setImages([]);
      }
    } catch (err) {
      toast.error(err.message || "Error deleteing all the images");
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4 text-white font-mono">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-100">
        📸 Image Gallery
      </h1>

      <div className="w-full max-w-2xl mx-auto mb-8">
        <div className="border-2 border-dashed border-gray-500 rounded-md p-6 bg-gray-800 shadow-md text-center">
          <input
            onChange={handleUpload}
            type="file"
            accept="image/*"
            className="hidden"
            id="upload"
            multiple
          />
          <label
            htmlFor="upload"
            className="block text-sm text-gray-300 mb-2 cursor-pointer"
          >
            Click or drag and drop files here to upload
          </label>
          <p className="text-xs text-gray-400">
            Supported formats: JPG, PNG, GIF
          </p>
        </div>
      </div>

      {loading && (
        <div className="p-4 rounded text-center">
          <p className="text-lg">Uploading...</p>
        </div>
      )}

      {/* Image grid */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.length > 0 ? (
            images.map((img) => (
              <div
                key={img.publicId}
                className="bg-gray-800 rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Link to={`${img.imageUrl}`}>
                  <img
                    src={img.imageUrl}
                    alt={img.originalName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <p className="text-center text-sm text-gray-300 font-medium truncate">
                      {img.originalName}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => deleteImage(img._id)}
                  className="w-full text-amber-50 p-2 bg-red-500 hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">
              No images uploaded yet.
            </p>
          )}
        </div>
        {images.length > 0 && (
          <div>
            <button
              onClick={deleteAllImages}
              className=" w-full mt-10 cursor-pointer hover:bg-red-600 p-2 rounded-4xl border-b-2 border-red-500"
            >
              Delete All Images
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
