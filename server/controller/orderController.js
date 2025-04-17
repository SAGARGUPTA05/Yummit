require("dotenv").config(); // Ensure dotenv is loaded at the very beginning

const Restaurant = require("../models/restaurantmodel");
const Order = require("../models/ordermodel");
const Menu = require("../models/menumodel"); // ✅ Import Menu model
const Stripe = require("stripe");
const dotenv = require("dotenv");
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_Secret_key);

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("user")
      .populate("restaurant");
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Restaurant Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createCheckOutSession = async (req, res) => {
  try {
    const checkoutSessionRequest = req.body;
    const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId).populate('menus');
    if (!restaurant) {
        return res.status(404).json({
            success: false,
            message: "Restaurant not found."
        });
    }

    const lineItems = createLineItems(checkoutSessionRequest, restaurant.menus);

    // Calculate totalAmount
    const totalAmount = lineItems.reduce((total, item) => total + (item.price_data.unit_amount * item.quantity), 0) / 100;

    const order = new Order({
        restaurant: restaurant._id,
        user: req.userId, // Ensure correct user ID
        deliveryDetails: checkoutSessionRequest.deliveryDetails,
        cartItems: checkoutSessionRequest.cartItems,
        totalAmount: totalAmount, // Set total amount for the order
        status: "pending"
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', 'CA']
        },
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.FRONT_END}/order/status`,
        cancel_url: `${process.env.FRONT_END}/cart`,
        metadata: {
            orderId: order._id.toString(),
            images: JSON.stringify(restaurant.menus.map((item) => item.image))
        }
    });

    if (!session.url) {
        return res.status(400).json({ success: false, message: "Error while creating session" });
    }

    await order.save();
    return res.status(200).json({ session });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.WEBHOOK_ENDPOINT_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const order = await Order.findById(session.metadata?.orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      order.totalAmount = session.amount_total || order.totalAmount;
      order.status = "confirmed";

      await order.save();
    } catch (error) {
      console.error("Error updating order:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.status(200).send();
};

const createLineItems = (checkoutSessionRequest, menuItems) => {
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find((item) => item._id.toString() === cartItem.menuId);
    if (!menuItem) throw new Error(`Menu item id not found`);

    return {
        price_data: {
            currency: 'inr',
            product_data: {
                name: menuItem.name,
                images: [menuItem.image],
            },
            unit_amount: menuItem.price * 100
        },
        quantity: cartItem.quantity,
    }
})
// 2. return lineItems
return lineItems;
};

module.exports = {
  createCheckOutSession,
  getOrders,
  stripeWebhook,
};
