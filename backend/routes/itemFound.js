const express = require('express')
const router = express.Router();
const FoundItem = require("../models/itemfound");
const{verifyClaim} = require('../controllers/vrification.js')
const {handleLostItem , handleGetFoundItems, handleFoundItem}= require('../controllers/handleItemFound.js');

const multer = require("multer");
const upload = multer({ dest: "uploads/" });router.get('/getfounditems',handleGetFoundItems )


router.post('/verify/:id',verifyClaim)
router.get("/claim/:id", async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/lostitem", upload.single("photo"),handleLostItem)
router.post("/itemfound", upload.single("photo"),handleFoundItem);

module.exports = router;
