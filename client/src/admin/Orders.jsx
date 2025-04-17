import React, { useEffect } from "react";
import { useRestaurantStore } from "../store/useRestaurantStore";
import { useThemeStore } from "../store/useThemeStore";
import { motion } from "framer-motion";

function Orders() {
  const { getRestaurantOrders, updateRestaurantOrder, restaurantOrders } =
    useRestaurantStore();
  const {theme}=useThemeStore()
  const isDark=theme==='dark';
  const handleStatusChange = async (id, status) => {
    await updateRestaurantOrder(id, status);
  };

  useEffect(() => {
    getRestaurantOrders();
  }, []);

  return (
     <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative"
        >
    <div className="max-w-6xl my-10 mx-auto">
    <h3 className={`text-3xl font-extrabold mb-10 ${isDark ? "text-[#E0E0E0]" : "text-gray-900"}`}>
      Orders overview
    </h3>
  
    <div className="space-y-8">
      {restaurantOrders.map((order, idx) => (
        <div
          key={idx}
          className={`flex flex-col md:flex-row justify-between items-start sm:items-center shadow-lg rounded-xl p-6 sm:p-8 border 
            ${isDark ? "bg-[#121212] border-[#444444]" : "bg-white border-gray-200"}`}
        >
          <div className="flex-1 mb-6 sm:mb-0">
            <h3 className={`font-semibold text-xl ${isDark ? "text-[#E0E0E0]" : "text-gray-800"}`}>
              {order.deliveryDetails.name}
            </h3>
            <p className={`${isDark ? "text-[#B0B0B0]" : "text-gray-600"} mt-2`}>
              <span className="font-semibold">Address: </span>
              {order.deliveryDetails.address}
            </p>
            <p className={`${isDark ? "text-[#B0B0B0]" : "text-gray-600"} mt-2`}>
              <span className="font-semibold">Total Amount: </span>
              ₹{order.totalAmount}
            </p>
          </div>
  
          <div className="w-full sm:w-1/3">
            <label
              className={`block text-sm font-medium mb-2 ${isDark ? "text-[#B0B0B0]" : "text-gray-700"}`}
            >
              Order Status
            </label>
            <select
              defaultValue={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              className={`w-full border rounded-md p-2 ${
                isDark
                  ? "bg-[#121212] text-[#E0E0E0] border-[#444444]"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              {["Pending", "Confirmed", "Preparing", "OutForDelivery", "Delivered"].map((item, index) => (
                <option key={index} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  </div>
  </motion.div>
  
  );
}

export default Orders;
