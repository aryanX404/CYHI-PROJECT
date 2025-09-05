const express = require('express')
const Item = require("../models/itemfound");
const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/" });


router.post("/itemfound", upload.single("photo"),async (req, res) => {

    console.log("Received request to add found item:", req.body);
    console.log("File info:", req.file);
  try {
    const { category, location, date, description, hiddenDetails } = req.body;
    const photo = req.file ? req.file.path : null;

    // Create new found item
    const newItem = new Item({
      category,
      location,
      date,
      description,
      hiddenDetails,
      photo,      // optional
      claimed: false,
      claimedBy: null
    });

    const savedItem = await newItem.save();
    res.status(201).json({
      success: true,
      message: "Found item added successfully",
      data: savedItem
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error adding found item",
      error: error.message
    });
  }
});

module.exports = router;
