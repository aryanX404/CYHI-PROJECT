const mongoose = require('mongoose');

const itemLostSchema = new mongoose.Schema({
  
  category: {
    type: String,
    required: true,
    // enum: ["Wallet", "Phone", "Bag", "Keys", "Card", "Other"] 
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  hiddenDetails: {
    type: String,
    required: true
  },
  photo: {
    type: String, // file path or URL
    required: false
  },
  claimed: {
    type: Boolean,
    default: false
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
}, { timestamps: true });

const LostItem = mongoose.model("itemlost", itemLostSchema);

module.exports = LostItem;
