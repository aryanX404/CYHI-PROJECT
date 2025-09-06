// const { GoogleGenAI } = require('@google/genai');
const FoundItem = require("../models/itemfound");
// require('dotenv').config();

// const ai = new GoogleGenAI({apikey :process.env.GEMINI_API});

async function verifyClaim(req, res) {

  
  try{
    const { userEmail ,description} = req.body
      
      const { id } = req.params;

      const item = await FoundItem.findById(id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

    const actualDetails = {category:item.category,
      
    };

    return res.json({
      actualDetails,
      description

    })

    // const prompt = `
    //   A person found an item and gave this hidden detail: 
    //   "${actualDetails}".

    //   Another person is trying to claim it and says: 
    //   "${description}".

    //   Respond with only similarity score between 0 to 100.
    // `;
    // Call Google Gemini AI
    // const response = await ai.models.generateContent({
    // model: "gemini-2.5-flash",
    // contents: 'weight of elephant',
    // });

  
    // const text = response.text();

    // Extract AI output safely
    // const output = result.candidates?.[0]?.content?.trim();
    // if (!output) {
    //   return res.status(500).json({ message: "AI did not return any response." });
    // }
    // return res.status(200).json({text})

    // Compare AI output
    // if (output.includes("MATCH")) {
    //   item.claimed = true;
    //   await item.save();
    //   return res.json({ success: true, message: "✅ Claim verified successfully!" });
    // } else {
    //   return res.json({ success: false, message: "❌ Verification failed. Details do not match." });
    
    // }
  }catch(err){
    console.error("Error in verifyClaim:", err);
    res.status(500).json({ message: "Server error during verification", error: err.message });
  }
  
}

module.exports = { verifyClaim };
