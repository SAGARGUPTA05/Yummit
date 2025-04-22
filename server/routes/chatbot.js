const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/recommend", async (req, res) => {
  const { message } = req.body;
  

  try {
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ Extract the actual reply text
    const reply = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      console.error("Invalid response structure:", geminiRes.data);
      return res.status(500).json({ error: "Invalid response from Gemini API" });
    }

    return res.json({ reply });
  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to get response from Gemini" });
  }
});

module.exports = router;
