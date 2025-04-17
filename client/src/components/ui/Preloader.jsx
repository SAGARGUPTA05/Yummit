import React, { useEffect, useState } from "react";

const foodColors = ["#FF6B00", "#FFB100", "#FFD93D", "#FFA500", "#FFC93C"];
const foodEmojis = ["🍕", "🍔", "🥗", "🌮", "🍩"];

const Preloader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-orange-100 via-yellow-100 to-white dark:from-[#2c1e00] dark:via-[#4a3200] dark:to-[#121212] transition-colors duration-500">
      <div className="flex gap-6 text-6xl md:text-8xl font-extrabold tracking-widest">
        {["Y", "U", "M", "M", "I", "T"].map((char, index) => (
          <div
            key={index}
            className="animate-bounce"
            style={{
              animationDelay: `${index * 0.2}s`,
              color: foodColors[index % foodColors.length],
              textShadow: "1px 1px 5px rgba(0,0,0,0.15)",
            }}
          >
            {char}
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3 text-3xl md:text-5xl animate-pulse">
        {foodEmojis.map((emoji, index) => (
          <span key={index}>{emoji}</span>
        ))}
      </div>
      <p className="mt-4 text-lg md:text-xl font-medium text-orange-700 drop-shadow">
        Your hunger solution is on the way...............
      </p>
    </div>
  );
};

export default Preloader;
