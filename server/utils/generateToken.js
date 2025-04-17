require("dotenv").config(); // Ensure dotenv is loaded at the very beginning

const jwt = require("jsonwebtoken");

const generateToken = (res, user) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
};

module.exports = generateToken;
