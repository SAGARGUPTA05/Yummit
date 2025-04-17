require("dotenv").config(); // Ensure dotenv is loaded at the very beginning

const {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} = require("../mailtrap/email");

const generateToken = require("../utils/generateToken");
const generateVerificationCode = require("../utils/generateVerificationCode");

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const uploadImageOnCludinary = require("../utils/imageUplod");
const User = require("../models/usermodel"); // Import User model


const signup = async (req, res) => {
  try {
    const { fullname, email, password, contact ,admin} = req.body;

    // Validate required fields
    if (!fullname || !email || !password || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure password strength
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = generateVerificationCode();

    // Create and save new user
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      contact: Number(contact),
      admin,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours expiration
    });

    await newUser.save();

    // Generate token and send email
    generateToken(res, newUser);
    await sendVerificationEmail(email, verificationToken);

    // Send user data without password
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
      newUser: userWithoutPassword,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // Generate token
    generateToken(res, user);

    // Update last login time
    user.lastlogin= new Date();
    await user.save();

    // Send user without password
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { verificationCode } = req.body;

    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    user.isverified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    // Send welcome email
    await sendWelcomeEmail(user.email, user.fullname);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user,
    });
  } catch (error) {
    console.error("Email Verification Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (_, res) => {
  try {
    return res.clearCookie("token").status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
    await user.save();

    // Send password reset email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.FRONT_END}/reset-password/${resetToken}`
    );

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    // Send success email
    await sendResetSuccessEmail(user.email);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const checkAuth = async (req, res) => {
  try {
    // Ensure `req.userId` is properly set
    const userId = req.userId;  // Change from `req.id` to `req.userId`

  

    // Fetch user from the database
    const user = await User.findById(userId).select("-password");

    if (!user) {
      console.log("User not found in database");
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

   

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Check Auth Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { fullname, email, address, city, country } =
      req.body;
      const file = req.file;
       
      const imageUrl=await uploadImageOnCludinary(file);

       

    const updatedData = {
      fullname,
      email,
      address,
      city,
      country,
      profilepicture: imageUrl,
    };

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
  verifyEmail,
  logout,
  forgetPassword,
  resetPassword,
  updateProfile,
  checkAuth
};
