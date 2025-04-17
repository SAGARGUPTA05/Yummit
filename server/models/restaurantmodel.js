const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    restaurantName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number, 
      required: true,
    },
    cuisines: {
      type: [String], // Enforcing an array of strings
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
      required:true, // Provide a default empty string
    },
    menus: {
      type: [mongoose.Schema.Types.ObjectId], // Store multiple menu items as an array
      ref:"Menu",
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
