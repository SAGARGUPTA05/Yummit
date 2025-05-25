import React from 'react'

function ShowPage() {
  return (
    <div>ShowPage</div>
  )
}

export default ShowPage


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
                <h5 className={`text-2xl font-bold ${theme=="light" ?'text-black' :'text-[#E0E0E0]'} `}>Yummit</h5>
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
                    <div className={`${theme=="light" ?'text-black' :'text-white'}font-extrabold`}>Yummit</div>
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
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import heroImg from "../../assets/hero_pizza.png";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../../store/useThemeStore";
import { restaurants } from "../foodItems";
import { motion } from "framer-motion";
import burger from "../../assets/burgur.avif";
import pizza from "../../assets/piza.avif";
import momo from "../../assets/momo.avif";
import leaf from "../../assets/leaf.avif";
import tomato from "../../assets/tomato.avif";
import ribbon from "../../assets/ribbonleft.avif";
import FloatingChatbot from "./FloatingChatbot";

function HeroSection() {
  const { theme } = useThemeStore();
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const navigate = useNavigate();

  const bgColor = theme === "light" ? "" : "bg-[#121212]";
  const textColor = theme === "light" ? "text-[#213547]" : "text-[#E0E0E0]";
  const cardBg = theme === "light" ? "bg-white" : "bg-[#1e1e1e]";
  const cardText = theme === "light" ? "text-gray-600" : "text-[#B0B0B0]";

  const isTyping = search.trim() !== "";

  // Scroll logic to toggle search bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        setShowSearch(false);
      } else {
        setShowSearch(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative"
    >
      {/* Floating Search Bar */}
      <div
        className={`fixed left-[50%] top-[33%] md:top-[68%] md:left-[30%] transform -translate-x-1/2 z-50 transition-all duration-300 ${
          showSearch
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={search}
              placeholder="Search by city & country"
              onChange={(e) => setSearch(e.target.value)}
              className={`pl-10 h-12 md:w-80 w-56 rounded-md outline-none shadow-lg transition-all duration-300 ${
                isTyping ? "scale-110 ring-2 ring-orange-500 pl-16 mr-4" : ""
              } ${textColor} ${
                theme === "light" ? "bg-gray-100" : "bg-[#2a2a2a]"
              }`}
            />
            <Search className="text-gray-500 absolute left-3 top-3.5" />
          </div>
          <button
            className="btn-orange"
            onClick={() => {
              if (isTyping) {
                navigate(`/search/${search}`);
              }
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Blurred Content */}
      <div
        className={`${isTyping ? "blur-sm" : ""} transition-all duration-300`}
      >
        {/* Hero Section */}
        <div
          className={`${bgColor} flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20 mb-18`}
        >
          <div className="flex flex-col gap-10 md:w-[40%]">
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-x-2">
                <motion.span
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 1 }}
                  className={`font-bold md:font-extrabold md:text-5xl text-4xl ${textColor}`}
                >
                  Order Food
                </motion.span>
                <motion.span
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 1 }}
                  className={`font-bold md:font-extrabold md:text-5xl text-4xl ${textColor}`}
                >
                  anytime & anywhere
                </motion.span>
              </div>

              <div className="flex flex-wrap gap-0 mt-2">
                {Array.from(
                  "Your favorite dishes, delivered faster than you can say ‘I’m hungry."
                ).map((char, index) => {
                  // Random direction and rotation for entrance
                  const randomX = Math.floor(Math.random() * 200 - 100); // -100 to +100
                  const randomY = Math.floor(Math.random() * 200 - 100);
                  const randomRotate = Math.floor(Math.random() * 360 - 180); // -180 to +180

                  return (
                    <motion.span
                      key={index}
                      initial={{
                        x: randomX,
                        y: randomY,
                        rotate: randomRotate,
                        opacity: 0,
                      }}
                      animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: index * 0.03, // stagger effect
                      }}
                      className="text-gray-500 text-lg"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          >
            <img
              src={heroImg}
              alt="Hero Pizza"
              className="object-cover w-full max-h-[500px] max-w-[90%] animate-spin-slow md:mt-10"
            />
          </motion.div>
        </div>
      <FloatingChatbot ></FloatingChatbot>
        {/* Restaurant Cards Section */}
        <div className="max-w-7xl mx-auto md:p-10 px-4">
          <h2 className={`text-2xl font-bold mb-6 ${textColor}`}>
            Popular Restaurants
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {restaurants.map((restaurant, index) => (
              <div
                key={index}
                className={`${cardBg} ${cardText} shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300`}
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2
                    className={`text-xl font-semibold mb-2 ${
                      theme === "light" ? "text-black" : "text-white"
                    }`}
                  >
                    {restaurant.name}
                  </h2>
                  <p className="text-sm mb-1">
                    {restaurant.cuisines.join(", ")}
                  </p>
                  <p className="text-sm">{restaurant.location}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      {restaurant.rating} ★
                    </span>
                    <span className="text-sm text-gray-400">
                      {restaurant.deliveryTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/*information section */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-28 relative overflow-hidden text-center mt-12 mb-12">
          {/* Ribbon Left */}
          <img
            src={ribbon}
            alt="left ribbon"
            className="absolute -left-[30rem] top-0 h-full w-auto z-0 pointer-events-none"
          />

          {/* Ribbon Right (Flipped) */}
          <img
            src={ribbon}
            alt="right ribbon"
            className="absolute -right-[15rem] rotate-45 -top-[10rem] h-full w-auto z-0 pointer-events-none transform scale-x-[-1]"
          />

          {/* Floating Food Images with Animation */}
          <motion.img
            src={burger}
            alt="burger"
            initial={{ y: -10 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute left-10 top-32 w-16 md:w-36 z-10"
          />

          <motion.img
            src={pizza}
            alt="pizza"
            initial={{ rotate: -5 }}
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute right-0 md:right-10 bottom-28 w-16 md:w-32 z-10"
          />

          <motion.img
            src={momo}
            alt="momo"
            initial={{ y: 0 }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute right-28 top-4 w-16 md:w-28 z-10"
          />

          <motion.img
            src={leaf}
            alt="leaf"
            initial={{ y: 0 }}
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute left-[45%] top-0 w-6 z-10"
          />

          <motion.img
            src={tomato}
            alt="tomato"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute left-6 bottom-20 w-6 z-10"
          />

          <motion.img
            src={tomato}
            alt="tomato"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute right-16 top-32 w-6 z-10"
          />

          {/* Text Section */}
          <div className="relative z-20">
            <h2 className="text-3xl md:text-5xl font-bold text-[#FF6B00] leading-tight space-y-2">
              <div>Better food for</div>
              <div>more people</div>
            </h2>
            <p className="text-gray-600 md:text-lg max-w-xl mx-auto mt-6">
              For over a decade, we’ve enabled our customers to discover new
              tastes, delivered right to their doorstep
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

function Footer() {
  const { theme } = useThemeStore();

  const bgColor = theme === 'light' ? 'bg-[#FFEFD2]' : 'bg-[#1A1A1A]';
  const textColor = theme === 'light' ? 'text-black' : 'text-gray-400';

  return (
    <footer className={`w-full py-10 px-6 ${bgColor} ${textColor}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Logo and Description */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className='font-extrabold text-5xl'>Yummit</h3>
            <p className="text-sm">Because good food can’t wait</p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-center md:text-left">
            <div>
              <p className="font-semibold mb-2">Company</p>
              <ul className="space-y-1">
                <li>Blinkit</li>
                <li>District</li>
                <li>Hyperpure</li>
                <li>Feeding India</li>
                <li>Investor Relations</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">For Restaurants</p>
              <ul className="space-y-1">
                <li>Partner With Us</li>
                <li>Apps For You</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">For Delivery Partners</p>
              <ul className="space-y-1">
                <li>Partner With Us</li>
                <li>Apps For You</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Learn More</p>
              <ul className="space-y-1">
                <li>Privacy</li>
                <li>Security</li>
                <li>Terms of Service</li>
                <li>Help & Support</li>
                <li>Report a Fraud</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
        </div>

        {/* App Logos and Social */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4 mb-4 md:mb-0">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" alt="Play Store" className="w-32" />
            <img src="data:image/png;base64,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" alt="App Store" className="w-32" />
          </div>

          <div className="flex gap-4 text-xl">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="border-t border-gray-600 pt-6 text-xs text-center">
          <p className="mb-1">
            By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners.
          </p>
          <p>2025-2025 © Yummit Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}






