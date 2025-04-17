const {
  createCheckOutSession,
  getOrders,
  stripeWebhook,
} = require("../controller/orderController");
const isAuthenticated = require("../middlewares/isAuthenticated");

const express = require("express");
const router = express.Router();

router.route("/").get(isAuthenticated,getOrders);
router.route("/checkout/create-checkout-session").post(isAuthenticated,createCheckOutSession);

//router.route("/webhook").post(express.raw({type:'application/json'}),stripeWebhook)


module.exports=router;