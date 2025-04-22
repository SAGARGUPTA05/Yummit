import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Globe, MapPin, X } from "lucide-react";
import { useRestaurantStore } from "../../store/useRestaurantStore";
import { useThemeStore } from "../../store/useThemeStore";
import { motion } from "framer-motion";

function SearchPage() {
  const { searchRestaurants, setAppliedFilter, appliedFilter, searchRestaurantResult, loading } =
    useRestaurantStore();
  const { text } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useThemeStore();

  useEffect(() => {
    searchRestaurants(text, searchQuery, appliedFilter);
  }, [text, searchQuery, appliedFilter]);

  const handleSearch = () => {
    searchRestaurants(text, searchQuery, appliedFilter);
  };

  const isDark = theme === "dark";

  return (
    <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative"
        >
    <div className={`max-w-6xl mx-auto my-10 overflow-x-hidden ${isDark ? "bg-[#121212]" : "bg-gradient-to-b from-orange-100 via-yellow-100 to-white"}`}>
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search by restaurant & cuisines"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className={`w-full h-10 pl-3 border rounded-md ${
                isDark
                  ? "bg-[#121212] text-[#E0E0E0] border-[#444444] placeholder-[#888888]"
                  : "bg-white text-black border-gray-300"
              }`}
            />
            <button onClick={handleSearch} className="btn-orange">
              Search
            </button>
          </div>

          <div className="my-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 mb-5">
              <h3 className={`font-medium text-lg ${isDark ? "text-[#E0E0E0]" : "text-gray-800"}`}>
                ({searchRestaurantResult?.restaurants?.length || 0}) Search result found for "{text}"
              </h3>

              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {appliedFilter.map((filter, index) => (
                  <div className="relative inline-flex items-center max-w-full" key={index}>
                    <div className="text-[#D19254] p-1 rounded-2xl pr-6 whitespace-nowrap shadow shadow-black">
                      {filter}
                    </div>
                    <X
                      onClick={() => setAppliedFilter(filter)}
                      size={16}
                      className="absolute text-[#D19254] right-1 hover:cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {loading ? (
                [...Array(6)].map((_, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl overflow-hidden animate-pulse ${
                      isDark ? "bg-[#121212]" : "bg-white"
                    } shadow-xl`}
                  >
                    <div className="relative">
                      <div className={`h-40 ${isDark ? "bg-[#444444]" : "bg-gray-300"}`} />
                      <div className={`absolute top-2 left-2 rounded-lg py-1 px-3 w-16 h-5 ${isDark ? "bg-[#444444]" : "bg-gray-300"}`} />
                    </div>
                    <div className="p-4">
                      <div className={`h-6 mb-2 w-3/4 ${isDark ? "bg-[#444444]" : "bg-gray-300"}`} />
                      <div className={`h-4 mb-2 w-1/2 ${isDark ? "bg-[#444444]" : "bg-gray-300"}`} />
                      <div className={`h-4 w-1/3 ${isDark ? "bg-[#444444]" : "bg-gray-300"}`} />
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {[1, 2, 3].map((_, index) => (
                          <div
                            key={index}
                            className={`h-6 w-16 rounded-full ${isDark ? "bg-[#444444]" : "bg-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className={`p-4 border-t flex justify-end ${isDark ? "border-[#444444]" : "border-gray-100"}`}>
                      <div className={`h-10 w-24 rounded-full ${isDark ? "bg-[#444444]" : "bg-gray-300"}`} />
                    </div>
                  </div>
                ))
              ) : searchRestaurantResult?.restaurants?.length > 0 ? (
                searchRestaurantResult.restaurants.map((item, idx) => (
                  <div
                    key={item._id || idx}
                    className={`rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ${
                      isDark ? "bg-[#1A1A1A]" : "bg-white"
                    }`}
                  >
                    <div className="relative">
                      <div className="h-6/12">
                        <img
                          className="w-full h-full object-cover"
                          src={
                            item.imageUrl ||
                            "https://res.cloudinary.com/djk7b7kkr/image/upload/v1744267317/uploads/bs53essazvvhqldbaokt.jpg"
                          }
                          alt="Restaurant"
                        />
                      </div>
                      <div className={`absolute top-2 left-2 py-1 px-3 rounded-lg ${
                        isDark ? "bg-[#444444]" : "bg-white/45"
                      }`}>
                        <span className={`text-sm font-medium ${isDark ? "text-[#E0E0E0]" : "text-gray-700"}`}>
                          Feature
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className={`text-2xl font-bold ${isDark ? "text-[#E0E0E0]" : "text-gray-900"}`}>
                        {item.restaurantName}
                      </h3>
                      <div className={`mt-2 gap-1 flex items-center ${isDark ? "text-[#B0B0B0]" : "text-gray-600"}`}>
                        <MapPin size={16} />
                        <p className="text-sm">
                          City: <span className="font-medium">{item.city}</span>
                        </p>
                      </div>
                      <div className={`mt-2 gap-1 flex items-center ${isDark ? "text-[#B0B0B0]" : "text-gray-600"}`}>
                        <Globe size={16} />
                        <p className="text-sm">
                          Country: <span className="font-medium">{item.country}</span>
                        </p>
                      </div>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {(item.cuisines || []).map((cuisine, index) => (
                          <div
                            key={index}
                            className={`text-sm px-2 py-1 rounded-full shadow-sm ${
                              isDark ? "bg-[#444444] text-[#E0E0E0]" : "bg-gray-200"
                            }`}
                          >
                            {cuisine}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={`p-4 border-t flex justify-center ${isDark ? "border-[#444444]" : "border-gray-100"}`}>
                      <button
                        onClick={() => navigate(`/restaurant-details/${item._id}`)}
                        className="btn-orange py-2 px-4 rounded-full shadow-md transition-colors duration-200"
                      >
                        View Menus
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center gap-y-4">
                  <div className={`col-span-3 text-center text-lg py-10 ${
                    isDark ? "text-[#B0B0B0]" : "text-gray-500"
                  }`}>
                    No results found for "{text}". Please try a different keyword or filter.
                  </div>

                  <button className="btn-orange" onClick={() => navigate("/")}>
                    Go Back To Home
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
}

export default SearchPage;
