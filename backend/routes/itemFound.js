const express = require('express')
const Item = require("../models/itemfound");
const router = express.Router();
const {handleLostItem , handleGetFoundItems,  handleClaim, handleFoundItem}= require('../controllers/handleItemFound.js');

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get('/getfounditems',handleGetFoundItems )
router.post("/claim/:id", handleClaim);
router.post("/lostitem", upload.single("photo"),handleLostItem)
router.post("/itemfound", upload.single("photo"),handleFoundItem);

module.exports = router;
