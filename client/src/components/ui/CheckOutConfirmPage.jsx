import { Loader, X } from "lucide-react";
import React, { useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { useCartStore } from "../../store/useCartStore";
import { useRestaurantStore } from "../../store/useRestaurantStore";
import { useOrderStore } from "../../store/useOrderStore";
import { useThemeStore } from "../../store/useThemeStore";

function CheckOutConfirmPage({ open, setOpen }) {
  if (!open) return null;
  const { user } = useUserStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  const { cart } = useCartStore();
  const { restaurant } = useRestaurantStore();
  const { createCheckoutSession, loading } = useOrderStore();

  const [input, setInput] = useState({
    name: user.fullname || "",
    email: user.email || "",
    contact: user.contact || "",
    address: user.address || "",
    city: user.city || "",
    country: user.country || "",
  });
  const checkOutHandler = async (e) => {
    e.preventDefault();
    try {
      const checkOutDAta = {
        cartItems: cart.map((cartItem) => ({
          menuId: cartItem._id,
          name: cartItem.name,
          image: cartItem.image,
          price: cartItem.price,
          quantity: cartItem.quantity,
        })),
        deliveryDetails: input,
        restaurantId: restaurant?._id,
        totalAmount: cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      };
      await createCheckoutSession(checkOutDAta);
    } catch (error) {}
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isDark ? "bg-[#121212]/75" : "bg-white/75"
      }`}
    >
      <div
        className={`p-6 rounded-lg shadow-lg w-full max-w-4xl ${
          isDark ? "bg-[#121212]" : "bg-white"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">
          Review Your Order Address Details
        </h2>

        <form
          onSubmit={checkOutHandler}
          className="  md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0 relative"
        >
          <div className="flex flex-col">
            <label htmlFor="fullname">Fullname</label>
            <input
              type="text"
              name="name"
              className="border border-gray-300 rounded-lg p-3 h-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
              id="fullname"
              value={input.name}
              onChange={changeHandler}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              disabled={true}
              type="email"
              name="email"
              id="email"
              value={input.email}
              onChange={changeHandler}
              className="border border-gray-300 rounded-lg p-3 h-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              name="contact"
              id="contact"
              value={input.contact}
              onChange={changeHandler}
              className="border border-gray-300 rounded-lg p-3 h-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={input.address}
              onChange={changeHandler}
              className="border border-gray-300 rounded-lg p-3 h-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              value={input.city}
              onChange={changeHandler}
              className="border border-gray-300 rounded-lg p-3 h-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              id="country"
              value={input.country}
              onChange={changeHandler}
              className="border border-gray-300 rounded-lg p-3 h-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            className="px-4 py-2  absolute -top-5 right-0"
            onClick={() => setOpen(false)}
          >
            <X size={20} className="text-black" />
          </button>
          <div className="col-span-2 flex justify-center">
            {loading ? (
              <button className="px-4 py-2 btn-orange w-full md:w-auto  flex items-center justify-center ">
                <Loader className="w-4 h-4 animate-spin"></Loader> Please
                wait...
              </button>
            ) : (
              <button className="px-4 py-2 btn-orange w-full md:w-auto  ">
                Continue To Payment
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckOutConfirmPage;
