const cloudinary = require("cloudinary").v2;
require("dotenv").config(); // Make sure to use dotenv for env variables

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // optional but recommended
});

module.exports = cloudinary;
