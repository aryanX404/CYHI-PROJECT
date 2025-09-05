const multer = require("multer");
const ItemLost = require("../models/itemlost");
const upload = multer({ dest: "uploads/" });

async function handleLostItem(req, res) {

    console.log("Received request to add found item:", req.body);
    console.log("File info:", req.file);
  try {
    const { category, location, date, description, hiddenDetails } = req.body;
    const photo = req.file ? req.file.path : null;

    // Create new found item
    const newItem = new ItemLost({
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
      message: "Lost item added successfully",
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
};

module.exports = handleLostItem;
