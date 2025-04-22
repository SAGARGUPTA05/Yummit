import { IndianRupee } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useOrderStore } from "../../store/useOrderStore";
import { useThemeStore } from "../../store/useThemeStore";
import { motion } from "framer-motion";

function Success() {
  const { orders, getOrderDetails, loading } = useOrderStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  useEffect(() => {
    getOrderDetails();
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDark ? "bg-[#121212]" : "bg-gradient-to-b from-orange-100 via-yellow-100 to-white"}`}>
        <h3 className={`text-xl ${isDark ? "text-[#B0B0B0]" : "text-gray-600"}`}>Loading...</h3>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDark ? "bg-[#121212]" : "bg-gradient-to-b from-orange-100 via-yellow-100 to-white"}`}>
        <h3 className={`text-2xl font-bold ${isDark ? "text-[#E0E0E0]" : "text-gray-700"}`}>
          Order not found
        </h3>
      </div>
    );
  }

  const totalPrice = orders.reduce((total, order) => {
    return (
      total +
      order.cartItems.reduce((itemTotal, item) => itemTotal + item.price, 0)
    );
  }, 0);

  const orderStatus = orders[0]?.status?.toUpperCase() || "CONFIRMED";

  return (
     <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative"
        >
    <div className={`flex items-center justify-center min-h-screen px-4 ${isDark ? "bg-[#121212]" : "bg-gradient-to-b from-orange-100 via-yellow-100 to-white"}`}>
      <div className={`shadow-lg rounded-lg p-6 max-w-lg w-full ${isDark ? "bg-[#1A1A1A] text-[#E0E0E0]" : "bg-white text-gray-800"}`}>
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold cursor-pointer">
            Order Status
          </h3>
        </div>

        <div className="mb-6">
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-[#E0E0E0]" : "text-gray-700"}`}>
            Order Summary
          </h3>

         {orders.map((order) =>
  order.cartItems.map((item) => (
    <div key={item._id || item.name} className="mb-4 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            className="w-14 h-14 rounded-md object-cover"
            src={
              item.image ||
              "https://tse1.mm.bing.net/th?id=OIP.pHmbbZEdq3849Ek_el48lwHaE8&pid=Api&P=0&h=180"
            }
            alt={item.name}
          />
          <div className="ml-4">
            <h3 className={`font-medium ${isDark ? "text-[#E0E0E0]" : "text-gray-800"}`}>
              {item.name}
            </h3>
            <span className="text-sm text-[#ff5A5A] font-semibold">
              Status: {order.status?.toUpperCase() || "CONFIRMED"}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className={`flex items-center ${isDark ? "text-[#E0E0E0]" : "text-gray-800"}`}>
            <IndianRupee />
            <span className="font-medium text-lg">{item.price}</span>
          </div>
        </div>
      </div>
      <hr className={`my-4 ${isDark ? "border-[#444444]" : "border-gray-300"}`} />
    </div>
  ))
)}


          <div className={`text-right font-semibold text-lg mt-4 ${isDark ? "text-[#E0E0E0]" : "text-gray-800"}`}>
            Total: ₹{totalPrice}
          </div>
        </div>

        <Link to="/cart">
          <button className="w-full py-2 px-4 rounded-md btn-orange shadow-lg">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
    </motion.div>
  );
}

export default Success;
