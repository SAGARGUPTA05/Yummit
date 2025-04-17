import React, { useState } from "react";
import { useCartStore } from "../../store/useCartStore";
import CheckOutConfirmPage from "./CheckOutConfirmPage";
import { Minus, Plus } from "lucide-react";
import MobileCart from "../MoblileCart";
import { useThemeStore } from "../../store/useThemeStore";
import { motion } from "framer-motion";

function Cart() {
  const [open, setOpen] = useState(false);
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useCartStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);

  return (
     <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative"
        >
    <div className={`max-w-6xl mx-auto my-10 ${isDark ? "text-[#E0E0E0]" : "text-gray-800"} `}>
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex justify-end">
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-red-500 text-black rounded-md"
          >
            Clear All
          </button>
        </div>
        <table className={`w-full mt-4 ${isDark ? "border-[#444444]" : "border-gray-300"}`}>
          <thead>
            <tr className={`${isDark ? "bg-[#444444]" : "bg-gray-200"}`}>
              <th className="p-2">Items</th>
              <th className="p-2">Title</th>
              <th className="p-2">Price</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Total</th>
              <th className="p-2 text-right">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={idx} className={`${isDark ? "border-b border-[#444444]" : ""}`}>
                <td className="p-2">
                  <img className="rounded-full w-12 h-12 object-cover" src={item.image} alt={item.name} />
                </td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">₹{item.price}</td>
                <td className="p-2 flex items-center justify-center">
                  <div className={`w-fit px-2 flex items-center rounded-full py-1 ${isDark ? "bg-[#444444]" : "bg-gray-100"} shadow-sm`}>
                    <button
                      onClick={() => decrementQuantity(item._id)}
                      className={`p-1 ${isDark ? "bg-[#888888] hover:bg-[#B0B0B0]" : "bg-gray-200 hover:bg-gray-300"} rounded-full`}
                    >
                      <Minus className="w-3 h-3 text-black" />
                    </button>
                    <span className="text-lg font-semibold mx-2">{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item._id)}
                      className={`p-1 ${isDark ? "bg-[#888888] hover:bg-[#B0B0B0]" : "bg-gray-200 hover:bg-gray-300"} rounded-full`}
                    >
                      <Plus className="w-3 h-3 text-black " />
                    </button>
                  </div>
                </td>
                <td className="p-2">₹{(item.quantity * item.price).toFixed(2)}</td>
                <td className="text-right">
                  <button onClick={() => removeFromCart(item._id)} className="btn-orange px-3 py-1 rounded-md">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th className="p-2">Total</th>
              <th colSpan={5} className="text-right p-2">₹{totalPrice}</th>
            </tr>
          </tfoot>
        </table>

        {cart.length > 0 && (
          <div className="mt-4 flex justify-end">
            <button className="btn-orange" onClick={() => setOpen(true)}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <MobileCart
          cart={cart}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          totalPrice={totalPrice}
          setOpen={setOpen}
        />
      </div>

      <CheckOutConfirmPage open={open} setOpen={setOpen} />
    </div>
    </motion.div>
  );
}

export default Cart;
