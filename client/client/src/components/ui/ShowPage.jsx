import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sun, Moon, ShoppingCart, Menu, X,
  Search
} from "lucide-react";
import { motion } from "framer-motion";
import { useThemeStore } from "../../store/useThemeStore";
import heroImg from "../../assets/hero_pizza.png";
import burger from "../../assets/burgur.avif";
import pizza from "../../assets/piza.avif";
import momo from "../../assets/momo.avif";
import leaf from "../../assets/leaf.avif";
import tomato from "../../assets/tomato.avif";
import ribbon from "../../assets/ribbonleft.avif";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

import { restaurants } from "../foodItems";
import FloatingChatbot from "./FloatingChatbot";

const foodColors = ["#FF6B00", "#FFB100", "#FFD93D", "#FFA500", "#FFC93C"];

function ShowPage() {
  const { theme, setTheme } = useThemeStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const navigate = useNavigate();

  const isTyping = search.trim() !== "";
  const bgColor = theme === "light" ? "" : "bg-[#121212]";
  const textColor = theme === "light" ? "text-[#213547]" : "text-[#E0E0E0]";
  const cardBg = theme === "light" ? "bg-white" : "bg-[#1e1e1e]";
  const cardText = theme === "light" ? "text-gray-600" : "text-[#B0B0B0]";

  useEffect(() => {
    const handleScroll = () => {
      setShowSearch(window.scrollY <= 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`w-screen ${theme === "light" ? 'bg-[#FFEFD2]' : 'bg-[#121212]'}`}>
      {/* Navbar */}
      <div className={`w-full fixed top-0 left-0 z-[300] ${theme === "light" ? 'bg-[#FFEFD2]' : 'bg-[#121212]'}` }>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-20 h-16">
          <Link to="/" className="text-black no-underline">
            <div className="flex gap-0 text-2xl md:text-3xl font-extrabold tracking-widest">
              {["Y", "U", "M", "M", "I", "T"].map((char, index) => (
                <div key={index} style={{ color: foodColors[index % foodColors.length], textShadow: "1px 1px 5px rgba(0,0,0,0.15)" }}>{char}</div>
              ))}
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/login" className={`font-medium ${theme === "light" ? "text-black" : "text-[#E0E0E0]"} `}> <button className="btn-orange">Login</button></Link>
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
              {theme === "light" ? <Moon className="w-5 h-5 text-gray-700" /> : <Sun className="w-5 h-5 text-yellow-500" />}
            </button>
          </div>
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
{isMobileMenuOpen && (
  <div className="fixed inset-0 z-[200] flex">
    {/* Blurred left overlay */}
    <div
      className="w-[30%] bg-black/30 backdrop-blur-sm"
      onClick={() => setIsMobileMenuOpen(false)}
    ></div>

    {/* Slide-in menu */}
    <div
      className={`w-[70%] h-full ${theme === "light" ? 'bg-white' : 'bg-[#121212]'} p-4 shadow-lg relative flex flex-col justify-between`}
    >
      {/* Top Row: Theme + Close */}
      <div className="flex justify-between items-center mt-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5 text-gray-700" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-500" />
          )}
        </button>

        {/* Close Button */}
        <button onClick={() => setIsMobileMenuOpen(false)}>
          <X className="w-6 h-6 font-bold" />
        </button>
      </div>

      {/* Spacer - keeps layout structured */}
      <div className="flex-grow"></div>

      {/* Bottom: Login */}
      <div className="mb-6">
        <Link
          to="/login"
          onClick={() => setIsMobileMenuOpen(false)}
          className="block w-full"
        >
          <button className="btn-orange w-full">Login</button>
        </Link>
      </div>
    </div>
  </div>
)}



      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative pt-16"
      >
        <div className={`fixed left-[50%] top-[33%] md:top-[68%] md:left-[30%] transform -translate-x-1/2 z-50 transition-all duration-300 ${showSearch ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={search}
                placeholder="Search by city & country"
                onChange={(e) => setSearch(e.target.value)}
                className={`pl-10 h-12 md:w-80 w-56 rounded-md outline-none shadow-lg ${isTyping ? "scale-110 ring-2 ring-orange-500 pl-16 mr-4" : ""} ${textColor} ${theme === "light" ? "bg-gray-100" : "bg-[#2a2a2a]"}`}
              />
              <Search className="text-gray-500 absolute left-3 top-3.5" />
            </div>
            <button className="btn-orange" onClick={() => isTyping && navigate(`/search/${search}`)}>Search</button>
          </div>
        </div>

        <div className={`${isTyping ? "blur-sm" : ""}`}>
          <div className={`${bgColor} flex flex-col md:flex-row max-w-7xl mx-auto p-10 rounded-lg items-center justify-center m-4 gap-20`}>
            <div className="flex flex-col gap-5 md:w-[40%]">
              <div className="flex flex-wrap gap-x-2">
                <motion.span className={`font-bold md:font-extrabold md:text-5xl text-4xl ${textColor}`}>Order Food</motion.span>
                <motion.span className={`font-bold md:font-extrabold md:text-5xl text-4xl ${textColor}`}>anytime & anywhere</motion.span>
              </div>
              <div className="flex flex-wrap gap-0 mt-2">
                {Array.from("Your favorite dishes, delivered faster than you can say ‘I’m hungry.").map((char, i) => (
                  <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="text-gray-500 text-lg">
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            </div>
            <motion.div initial={{ x: -150, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.2 }}>
              <img src={heroImg} alt="Hero" className="object-cover w-full max-h-[500px] max-w-[90%] animate-spin-slow" />
            </motion.div>
          </div>

          

          <div className="max-w-7xl mx-auto md:p-10 px-4">
            <h2 className={`text-2xl font-bold mb-6 ${textColor}`}>Popular Restaurants</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {restaurants.map((restaurant, i) => (
                <div key={i} className={`${cardBg} ${cardText} shadow-md rounded-lg hover:shadow-xl transition duration-300`}>
                  <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className={`text-xl font-semibold mb-2 ${theme === "light" ? "text-black" : "text-white"}`}>{restaurant.name}</h2>
                    <p className="text-sm mb-1">{restaurant.cuisines.join(", ")}</p>
                    <p className="text-sm">{restaurant.location}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">{restaurant.rating} ★</span>
                      <span className="text-sm text-gray-400">{restaurant.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className={`w-full py-10 px-6 ${theme === "light" ? "bg-[#FFEFD2]" : "bg-[#1A1A1A]"} ${textColor}`}>
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                <div className="mb-6 md:mb-0 text-center md:text-left">
                  <h3 className="font-extrabold text-5xl">Yummit</h3>
                  <p className="text-sm">Because good food can’t wait</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-center md:text-left">
                  <div>
                    <p className="font-semibold mb-2">Company</p>
                    <ul className="space-y-1"><li>Blinkit</li><li>District</li><li>Hyperpure</li><li>Feeding India</li><li>Investors</li></ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">For Restaurants</p>
                    <ul className="space-y-1"><li>Partner With Us</li><li>Apps For You</li></ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Delivery Partners</p>
                    <ul className="space-y-1"><li>Partner With Us</li><li>Apps For You</li></ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Learn More</p>
                    <ul className="space-y-1"><li>Privacy</li><li>Security</li><li>Terms</li><li>Support</li><li>Blog</li></ul>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex gap-4 mb-4 md:mb-0">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" alt="Play Store" className="w-32" />
                  <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="w-32" />
                </div>
                <div className="flex gap-4 text-xl">
                  <FaFacebook /><FaInstagram /><FaTwitter /><FaYoutube />
                </div>
              </div>
              <div className="border-t border-gray-600 pt-6 text-xs text-center">
                <p>© 2025 Yummit Ltd. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </motion.div>
    </div>
  );
}

export default ShowPage;
