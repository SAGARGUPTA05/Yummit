const {
  createRestaurant,
  getSingleRestaurant,
  searchRestaurant,
  updateOrderStatus,
  updateRestaurant,
  getRestaurantOrder,
  getRestaurant,
} = require("../controller/restaurantController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, upload.single("image"), createRestaurant);
router.route("/").get(isAuthenticated, getRestaurant);
router.route("/").put(
  isAuthenticated,
  upload.single("image"),
  updateRestaurant
);
router.route("/order").get(isAuthenticated, getRestaurantOrder);
router.route("/order/:orderId/status").put(isAuthenticated, updateOrderStatus);
router.route("/search/:searchText").get(isAuthenticated, searchRestaurant);
router.route("/:id").get(isAuthenticated, getSingleRestaurant);

module.exports = router;
