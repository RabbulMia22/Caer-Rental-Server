const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

// Direct upload to Cloudinary
router.post("/", upload.single("image"), (req, res) => {
  try {
    res.json({
      message: "Image uploaded successfully",
      url: req.file.path, // This is already a Cloudinary URL
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

module.exports = router;
