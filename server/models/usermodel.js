const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: String, // Changed from Number to String
      required: true,
    },
    address: {
      type: String,
      default: "update your address",
    },
    city: {
      type: String,
      default: "update your city",
    },
    country: {
      type: String,
      default: "update your country",
    },
    profilepicture: {
      type: String,
      default: "",
    },
    admin: {
      type: Boolean,
      default: false,
    },
    // Advance authentication fields
    lastlogin: {
      type: Date,
      default: Date.now,
    },
    isverified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
