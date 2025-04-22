const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const events = require("events");
const userRoute = require("./routes/userRoute");
const RestaurantRoute = require("./routes/restaurantRoute");
const MenuRoute = require("./routes/menuRoute");
const OrderRoute = require("./routes/orderRoute");
const webhookRoute=require("./routes/webhookRoute")

// Load environment variables
dotenv.config();


events.EventEmitter.defaultMaxListeners = 15; // Increase limit (adjust if needed)


const app = express();
const PORT = process.env.PORT || 3000;
//webhook
app.use("/api/v1/order/webhook",webhookRoute );
// Default middleware for any MERN project
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, 
};
app.use(cors(corsOptions)); 

// API Routes
app.use("/api/v1/user", userRoute);
//API for restaurant
app.use("/api/v1/restaurant", RestaurantRoute);

//API for menu
app.use("/api/v1/menu", MenuRoute);
//API for order status
app.use("/api/v1/order", OrderRoute);
//API for chat bot
app.use("/api/v1/chatbot", require("./routes/chatbot"));




// Connect to Database and Start Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT} `)
      ;
    });
  })
  .catch((err) => {
    console.error(" Database connection failed:", err);
    process.exit(1); // Exit process if DB connection fails
  });
