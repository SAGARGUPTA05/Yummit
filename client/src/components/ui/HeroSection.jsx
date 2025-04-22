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

export default HeroSection;
