const { stripeWebhook } = require("../controller/orderController");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .post(express.raw({ type: "application/json" }), stripeWebhook);

module.exports = router;
