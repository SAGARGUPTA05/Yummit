
const dotenv = require("dotenv");

// Load environment variables from `.env` file
dotenv.config();
const cloudinary = require("cloudinary").v2; // Use `.v2` for the latest API support

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Must be defined first
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET,
  secure: true, // Ensures HTTPS for security
});

module.exports = cloudinary;
