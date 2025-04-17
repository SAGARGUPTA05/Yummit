//mongopassword='5UbweMiY0AWRjslT';
//mongousername="sggupta8742";



const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectDB;
