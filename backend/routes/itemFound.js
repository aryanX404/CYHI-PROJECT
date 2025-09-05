import express from "express";
import Item from "../models/itemfound.js";
const router = express.Router();


router.post("/founditem", async (req, res) => {
  try {
    const { category, location, date, description, hiddenDetails, photo } = req.body;

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

export default router;
