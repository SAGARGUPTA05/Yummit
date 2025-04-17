import React from "react";
import { Minus, Plus } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

function MobileCart({
  cart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  totalPrice,
  setOpen,
}) {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  return (
    <div
      className={`p-4 space-y-6 ${isDark ? "bg-[#121212] text-[#E0E0E0]" : ""}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button
          onClick={clearCart}
          className={`text-sm underline ${
            isDark ? "text-black" : "text-black"
          }`}
        >
          Clear All
        </button>
      </div>
      {cart.length === 0 ? (
        <p
          className={`${
            isDark ? "text-[#B0B0B0]" : "text-gray-500"
          } text-center`}
        >
          Your cart is empty.
        </p>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            className={`rounded-lg p-4 space-y-3 shadow-md ${
              isDark ? "bg-[#1E1E1E]" : "bg-white"
            }`}
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className={`text-sm ${isDark ? "text-[#B0B0B0]" : "text-gray-500"}`}>₹{item.price} each</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decrementQuantity(item._id)}
                  className={`p-1 rounded-full ${isDark ? "bg-[#444444]" : "bg-gray-200"}`}
                >
                  <Minus className="w-4 h-4 text-black" />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => incrementQuantity(item._id)}
                  className={`p-1 rounded-full ${isDark ? "bg-[#444444]" : "bg-gray-200"}`}
                >
                  <Plus className="w-4 h-4 text-black" />
                </button>
              </div>
              <div className={`text-sm font-semibold ${isDark ? "text-[#E0E0E0]" : "text-gray-700"}`}>
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-black text-sm underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <>
          <div className="text-right font-bold text-lg">
            Total: ₹{totalPrice}
          </div>
          <button
            className="btn-orange w-full mt-4"
            onClick={() => setOpen(true)}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default MobileCart;
