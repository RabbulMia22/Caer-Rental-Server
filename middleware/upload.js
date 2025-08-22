const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

// Direct storage to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "myFolder", // optional: cloudinary folder name
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

module.exports = upload;
