require("dotenv").config(); // Ensure dotenv is loaded at the very beginning

const jwt = require("jsonwebtoken");

 const isAuthenticated = async (req, res, next) => {
  try {
    // Ensure cookies exist before accessing them
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach user ID to request object
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error(error);
    
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};


module.exports=isAuthenticated