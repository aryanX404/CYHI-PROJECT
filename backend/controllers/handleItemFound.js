const multer = require("multer");
const dotenv = require('dotenv')
const ItemLost = require("../models/itemlost");
const FoundItem = require("../models/itemfound");
const upload = multer({ dest: "uploads/" });
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMENI_API);


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


async function handleGetFoundItems(req, res) {
  try{
    const foundItems = await FoundItem.find({ });
    res.status(200).json(foundItems);
  }catch(err){
    res.status(500).json({ error: 'Server error' });  
  }
}

async function handleGetItemById(req, res){
    try {
      const item = await FoundItem.findById({});
      if (!item) return res.status(404).json({ success: false, message: "No items" });
      const claimedItems = item.map
      res.status(200).json(item);
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
}

async function handleClaim(req, res) {
  try {
    const { user, hiddenDetails } = req.body;
    const itemId = req.params.id;

    const item = await FoundItem.findById(itemId);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });
    if (item.claimed) return res.status(400).json({ success: false, message: "Item already claimed" });

    // AI Comparison
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      Compare the two descriptions and give a similarity score from 0 to 100.

      Original hidden details: "${item.hiddenDetails}".
      Claimer provided: "${hiddenDetails}".

      Reply ONLY with a number between 0 and 100 (no extra text).
      `;

    const result = await model.generateContent(prompt);

    let score = 0;
    try {
      console.log("AI raw response:", result);
      const aiText = result.response?.text?.().trim() || result.output?.[0]?.content?.[0]?.text || "0";
      score = parseInt(aiText, 10);
    } catch (err) {
      console.error("Error parsing AI response:", err);
    }

    if (!isNaN(score) && score >= 70) {
      item.claimed = true;
      item.claimedBy = user.email;
      await item.save();

      return res.status(200).json({
        success: true,
        message: `Item successfully claimed (AI Score: ${score})`,
        score,
        item,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `Claim rejected (AI Score: ${score || "Invalid"})`,
        score: score || null,
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error claiming item" });
  }
}



module.exports = {  handleLostItem, handleGetFoundItems, handleGetItemById, handleClaim};
