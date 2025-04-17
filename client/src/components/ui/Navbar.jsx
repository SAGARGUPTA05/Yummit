import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sun,
  Moon,
  ShoppingCart,
  Loader2,
  Menu,
  X,
  User,
  PackageCheck,
  UtensilsCrossed,
  SquareMenu,
  HandPlatter,
} from "lucide-react";
import { useCartStore } from "../../store/useCartStore";
import { useUserStore } from "../../store/useUserStore";
import { useThemeStore } from "../../store/useThemeStore";
import websiteLogo from '../../assets/logo.png'
const foodColors = ["#FF6B00", "#FFB100", "#FFD93D", "#FFA500", "#FFC93C"];

function Navbar() {
  const { user, loading, logout } = useUserStore();
  const { setTheme, theme } = useThemeStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCartStore();

  const navigateHandler = () => {
    setIsMobileMenuOpen(false);
  };

  const fallbackProfile = "data:image/jpeg;base64,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"; // Add your default image path here

  return (
    <div className={`w-full ${theme ==="light" ? 'bg-[#FFEFD2] ' : 'bg-[#121212]'}  fixed top-0 left-0 z-[300] `}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-20 h-16">
        {/* Logo */}
        <Link to="/" className="text-black no-underline">
        <div className="flex gap-0  text-2xl md:text-3xl font-extrabold tracking-widest">
        {["Y", "U","M", "M", "I", "T"].map((char, index) => (
          <div
            key={index}
            className=""
            style={{
             
              color: foodColors[index % foodColors.length],
              textShadow: "1px 1px 5px rgba(0,0,0,0.15)",
            }}
          >
            {char}
          </div>
        ))}
      </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-black no-underline hover:text-gray-700">
            <p className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`}>Home</p>
          </Link>
          <Link to="/profile" className="text-black no-underline hover:text-gray-700">
            <p className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`}>Profile</p>
          </Link>
          <Link to="/order/status" className="text-black no-underline hover:text-gray-700">
            <p className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`}>Order</p>
          </Link>

          {user?.admin && (
            <div className="relative">
              <button
                className="font-medium text-black outline-none focus:ring-0"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Dashboard
              </button>
              {isDropdownOpen && (
                <div className={`absolute ${theme=="light" ?'bg-white' :'bg-black'} shadow-md rounded-md p-2 mt-2 w-40`}>
                  <Link
                    onClick={() => setIsDropdownOpen(false)}
                    to="/admin/restaurant"
                    className="block px-4 py-2 hover:bg-gray-200 text-black no-underline"
                  >
                    <p className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`}>Restaurant</p>
                  </Link>
                  <Link
                    onClick={() => setIsDropdownOpen(false)}
                    to="/admin/menu"
                    className="block px-4 py-2 hover:bg-gray-200 text-black no-underline"
                  >
                    <p className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`}>Menu</p>
                  </Link>
                  <Link
                    onClick={() => setIsDropdownOpen(false)}
                    to="/admin/orders"
                    className="block px-4 py-2 hover:bg-gray-200 text-black no-underline"
                  >
                    <p className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`}>Orders</p>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-x-4">
          {/* Theme Toggle */}
          <button
            className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-gray-700" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-500" />
            )}
          </button>

          {/* Profile Picture */}
          {user && (
            <div className="w-12 h-12 flex justify-center items-center  text-white rounded-full font-semibold ">
              <div className="w-12 h-12 flex justify-center items-center  rounded-full">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={user?.profilepicture || fallbackProfile}
                  alt="User"
                />
              </div>
            </div>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative cursor-pointer">
            <ShoppingCart className={`w-6 h-6 ${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`} />
            {cart.length > 0 && (
              <div className={`absolute -top-2 -right-2 text-xs rounded-full animate-bounce w-4 h-4 bg-red-500 ${theme=="light" ?'text-black' :'text-[#E0E0E0]'} flex items-center justify-center`}>
                {cart.length}
              </div>
            )}
          </Link>

          {/* Logout/Login */}
          <div>
            {loading ? (
              <button className="btn-orange flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
              </button>
            ) : (
              <button onClick={logout} className="btn-orange">
                <Link to="/login">
                  <p className="text-white">Logout</p>
                </Link>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden absolute z-[300] right-5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden lg:hidden shadow-md pl-32 h-screen w-full bg-black/70 absolute top-0 bottom-0 z-[200]">
          <div className={`w-full h-full ${theme=="light" ?'bg-white' :'bg-[#121212]'}  pt-16`}>
            <div className="w-full h-full flex flex-col gap-y-8">
              <div className="flex items-center justify-between px-3">
                <h5 className={`text-2xl font-bold ${theme=="light" ?'text-black' :'text-[#E0E0E0]'} `}>FoodPlus</h5>
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                >
                  {theme == "light" ? (
                    <Moon className="w-4 h-4 text-gray-700" />
                  ) : (
                    <Sun className="w-4 h-4 text-yellow-500" />
                  )}
                </button>
              </div>

              <div className="flex flex-col gap-y-4">
                <div className="flex gap-x-2 px-8" onClick={navigateHandler}>
                  <User className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`} />
                  <Link to="/profile">
                    <p className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`}>Profile</p>
                  </Link>
                </div>
                <div className="flex gap-x-2 px-8" onClick={navigateHandler}>
                  <HandPlatter className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`} />
                  <Link to="/order/status">
                    <p className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`}>Order</p>
                  </Link>
                </div>
                <div className="flex gap-x-2 px-8" onClick={navigateHandler}>
                  <ShoppingCart className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`} />
                  <Link to="/cart">
                    <p className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`}>Cart</p>
                  </Link>
                </div>

                {user?.admin && (
                  <div className="flex flex-col gap-y-4">
                    <div className="flex gap-x-2 px-8" onClick={navigateHandler}>
                      <SquareMenu className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`} />
                      <Link to="/admin/menu">
                        <p className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`}>Menu</p>
                      </Link>
                    </div>
                    <div className="flex gap-x-2 px-8" onClick={navigateHandler}>
                      <UtensilsCrossed className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`} />
                      <Link to="/admin/restaurant">
                        <p className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`}>Restaurant</p>
                      </Link>
                    </div>
                    <div className="flex gap-x-2 px-8" onClick={navigateHandler}>
                      <PackageCheck className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`} />
                      <Link to="/admin/orders">
                        <p className={`${theme=="light" ?'text-black' :'text-[#E0E0E0]'}`}>Restaurant Orders</p>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {user && (
                <>
                  <div className="flex gap-x-6 px-4 mt-36 items-center">
                    <div className="w-10 h-10 flex justify-center items-center bg-gray-400 text-white rounded-full font-semibold">
                      <div className="w-10 h-10 flex justify-center items-center bg-white rounded-full text-gray-700">
                        <img
                          className="w-full h-full object-cover rounded-full"
                          src={user?.profilepicture || fallbackProfile}
                          alt="User"
                        />
                      </div>
                    </div>
                    <div className={`${theme=="light" ?'text-black' :'text-white'}font-extrabold`}>Food Plus</div>
                  </div>
                  <div className="flex gap-x-6 px-4 sm:mt-16">
                    <button onClick={logout} className="btn-orange w-full">
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
