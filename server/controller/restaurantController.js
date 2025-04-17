require("dotenv").config(); // Ensure dotenv is loaded at the very beginning

const Order = require("../models/ordermodel");
const Restaurant = require("../models/restaurantmodel");

const uploadImageOnCludinary = require("../utils/imageUplod");




// Create Restaurant Controller
const createRestaurant = async (req, res) => {
  try {
    const { restaurantName, city, country, price, deliveryTime, cuisines } =
      req.body;
    const file = req.file;

    // Check if the user already has a restaurant
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant already exists",
      });
    }

    //image checking
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const imageUrl = await uploadImageOnCludinary(file);

    // Create new restaurant
    const newRestaurant = new Restaurant({
      user:  req.userId,
      restaurantName,
      city,
      country,
      price,
      deliveryTime,
      cuisines,
      imageUrl: imageUrl, // Store file path if uploaded
    });

    await newRestaurant.save();

    return res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant: newRestaurant,
    });
  } catch (error) {
    console.error("Restaurant Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.find({ user: req.userId }).populate('menus');
    if (!restaurant || restaurant.length === 0) {
      return res.status(400).json({
        success: false,
        
        message: "Restaurant not found",
      });
    }

    return res.status(201).json({
      success: true,

      restaurant,
    });
  } catch (error) {
    console.error("Restaurant Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } =
      req.body;
    const file = req.file;
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliveryTime = deliveryTime;
    const cuisinesArray = typeof cuisines === "string" ? JSON.parse(cuisines) : cuisines;

    restaurant.cuisines = cuisinesArray;

    if (file) {
      const imageUrL = await uploadImageOnCludinary(file);
      restaurant.imageUrl = imageUrL;
    }

    await restaurant.save();
    return res.status(201).json({
      success: true,
      message: "Restaurant updated",
      restaurant,
    });
  } catch (error) {
    console.error("Restaurant Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getRestaurantOrder = async (req, res) => {
  try {
    const restaurant = await  Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Restaurant Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({
        success: false,
        message: "order not found",
      });
    }

    order.status = status;
    await order.save();
    return res.status(200).json({
      success: true,
      message: "Order updated ",
      status:order.status,
      order,
    });
  } catch (error) {
    console.error("Restaurant Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const searchRestaurant = async (req, res) => {
  try {
    const searchText = req.params.searchText || "";
    const searchQuery = req.query.searchQuery || "";
    const selectCuisions = (req.query.selectCuisions || "")
      .split(",")
      .filter((cuisine) => cuisine);

    const query = {};

    const orConditions = [];
    
    // basic search based on searchText e.g., name, city, country
    if (searchText) {
      orConditions.push(
        { restaurantName: { $regex: searchText, $options: "i" } },
        { city: { $regex: searchText, $options: "i" } },
        { country: { $regex: searchText, $options: "i" } }
      );
    }

    // additional filter based on searchQuery e.g., name, cuisines
    if (searchQuery) {
      orConditions.push(
        { restaurantName: { $regex: searchQuery, $options: "i" } },
        { cuisines: { $elemMatch: { $regex: searchQuery, $options: "i" } } }
      );
    }
    
    if (orConditions.length > 0) {
      query.$or = orConditions;
    }
    
    // filter by selected cuisines
    if (selectCuisions.length > 0) {
      query.cuisines = { $in: selectCuisions };
    }

    const restaurants = await Restaurant.find(query);

    return res.status(200).json({
      success: true,
      restaurants,
    });
  } catch (error) {
    console.error("Restaurant Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const getSingleRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId).populate({
      path: "menus",
      options: { createdAt: -1 },
    });
    if (!restaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant not found",
      });
    }
    return res.status(200).json({
      success: true,

      restaurant,
    });
  } catch (error) {
    console.error("Restaurant Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createRestaurant,
  getSingleRestaurant,
  searchRestaurant,
  updateOrderStatus,
  updateRestaurant,
  getRestaurantOrder,
  getRestaurant,
};
