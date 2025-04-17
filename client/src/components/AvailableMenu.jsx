import React, { useState, useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";

function AvailableMenu({ menus = [] }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { cart, addToCart } = useCartStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className={`md:p-4 ${isDark ? "text-[#E0E0E0]" : "text-black"}`}>
      <h5 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menu
      </h5>
      <div className="grid md:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden ${
                isDark ? "bg-[#333] animate-pulse" : "bg-gray-200 animate-pulse"
              }`}
            >
              <div className={`${isDark ? "bg-[#444]" : "bg-gray-300"} w-full h-40`}></div>
              <div className="p-4 space-y-2">
                <div className={`${isDark ? "bg-[#444]" : "bg-gray-300"} h-6 rounded w-32`}></div>
                <div className={`${isDark ? "bg-[#444]" : "bg-gray-300"} h-4 rounded w-48`}></div>
                <div className={`${isDark ? "bg-[#444]" : "bg-gray-300"} h-6 rounded w-24 mt-4`}></div>
              </div>
              <div className="p-4">
                <div className={`${isDark ? "bg-[#444]" : "bg-gray-300"} h-10 rounded w-full`}></div>
              </div>
            </div>
          ))
        ) : menus.length === 0 ? (
          <p className={`${isDark ? "text-[#B0B0B0]" : "text-gray-500"} col-span-full`}>
            No menu available.
          </p>
        ) : (
          menus.map((menu, index) => (
            <div
              key={menu._id || index}
              className={`max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden ${
                isDark ? "bg-[#1e1e1e]" : "bg-white"
              }`}
            >
              <img
                src={menu.image}
                alt={menu.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h5 className={`text-xl font-semibold ${isDark ? "text-[#E0E0E0]" : "text-gray-800"}`}>
                  {menu.name}
                </h5>
                <p className={`text-sm mt-2 ${isDark ? "text-[#B0B0B0]" : "text-gray-600"}`}>
                  {menu.description}
                </p>
                <h5 className="text-lg font-semibold mt-4">
                  Price: <span className="text-[#d19254]">₹{menu.price}</span>
                </h5>
              </div>
              <div className="p-4">
                <button
                  onClick={() => {
                    addToCart(menu);
                    navigate("/cart");
                  }}
                  className="btn-orange w-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AvailableMenu;
