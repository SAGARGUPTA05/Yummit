const express = require("express");
const {
  signup,
  login,
  logout,
  verifyEmail,
  forgetPassword,
  resetPassword,
  updateProfile,
  checkAuth,
} = require("../controller/userController");

const  isAuthenticated  = require("../middlewares/isAuthenticated"); // Import authentication middleware
//const checkAuth="cvd";
const router = express.Router();
const upload=require('../middlewares/multer')

router.route("/check-auth").get(isAuthenticated,checkAuth);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/verify-email").post(verifyEmail);
router.route("/forget-password").post(forgetPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/profile/update").put(isAuthenticated,upload.single("profileImg"), updateProfile);

module.exports = router;
