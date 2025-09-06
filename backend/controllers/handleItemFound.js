const multer = require("multer");
const dotenv = require('dotenv')
const ItemLost = require("../models/itemlost");
const FoundItem = require("../models/itemfound");
const upload = multer({ dest: "uploads/" });


dotenv.config()

async function handleLostItem(req, res) {
    console.log("Received request to add found item:", req.body);
    console.log("File info:", req.file);
  try {
    let lostBy = null;
    if (req.body.lostBy) {
      // Convert string back to object
      lostBy = JSON.parse(req.body.lostBy);
    }
    const { category, location, date, description, hiddenDetails } = req.body;
    const photo = req.file ? `uploads/${req.file.filename}` : null;

    // Create new found item
    const newItem = new ItemLost({
      category,
      location,
      date,
      description,
      hiddenDetails,
      photo,  
      lostBy,    // optional
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

async function handleFoundItem(req,res){
    console.log("Received request to add found item:", req.body);
    console.log("File info:", req.file);
  try {
    let foundBy = null;
    if (req.body.foundBy) {
      // Convert string back to object
      foundBy = JSON.parse(req.body.foundBy);
    }
    const { category, location, date, description, hiddenDetails } = req.body;
    const photo = req.file ? `uploads/${req.file.filename}` : null;

    // Create new found item
    const newItemFound = new FoundItem({
      category,
      location,
      date,
      description,
      hiddenDetails,
      photo,  
      foundBy,    // optional
      claimed: false,
      claimedBy: null
    });

    const savedItem = await newItemFound.save();
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

async function handleGetFoundItems(req, res) {
  try{
    const foundItems = await FoundItem.find({ });
    res.status(200).json(foundItems);
  }catch(err){
    res.status(500).json({ error: 'Server error' });  
  }
}



module.exports = {  handleLostItem, handleGetFoundItems,  handleFoundItem};
