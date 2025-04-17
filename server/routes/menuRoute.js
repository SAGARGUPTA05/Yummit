const {
  addMenu,
  deleteMenu,
  editMenu,
} = require("../controller/menuController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const express = require("express");
const router = express.Router();

router.route("/").post(isAuthenticated,upload.single("image"),addMenu);
router.route("/:id").put(isAuthenticated,upload.single("image"),editMenu);
router.route("/:id").post(isAuthenticated,deleteMenu);



module.exports=router;