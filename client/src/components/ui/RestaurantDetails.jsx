import React, { useEffect } from "react";
import { Timer } from "lucide-react";
import AvailableMenu from "../AvailableMenu";
import { useRestaurantStore } from "../../store/useRestaurantStore";
import { useParams } from "react-router-dom";
import { useThemeStore } from "../../store/useThemeStore";
import { motion } from "framer-motion";

function RestaurantDetails() {
  const { id } = useParams();
  const { singleRestaurant, getSingleRestaurant } = useRestaurantStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    getSingleRestaurant(id);
  }, [id]);

  if (!singleRestaurant) {
    return (
      <div
        className={`text-center py-10 ${
          theme === "dark" ? "text-[#E0E0E0] bg-[#121212]" : ""
        }`}
      >
        Loading restaurant details...
      </div>
    );
  }

  return (
    <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative"
        >
    <div
      className={`max-w-6xl mx-auto my-10 ${
        theme === "dark" ? "text-[#E0E0E0] bg-[#121212]" : ""
      }`}
    >
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img
            src={
              singleRestaurant.imageUrl ||
              "https://res.cloudinary.com/djk7b7kkr/raw/upload/v1743748041/uploads/crgv7srusaanuje7cabc"
            }
            alt=""
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h4 className="font-medium text-xl">
              {singleRestaurant.restaurantName || "Loading..."}
            </h4>

            {/* Cuisines */}
            <div className="flex gap-2 my-2 flex-wrap">
              {Array.isArray(singleRestaurant.cuisines) &&
                singleRestaurant.cuisines.map((cuisine, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl p-1 px-3 text-sm ${
                      theme === "dark"
                        ? "bg-[#444444] text-[#E0E0E0]"
                        : "bg-gray-900 text-white"
                    }`}
                  >
                    {cuisine}
                  </div>
                ))}
            </div>

            {/* Delivery Time */}
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h5 className="flex items-center gap-2 font-medium">
                  Delivery Time:
                  <span className="text-[#d19254]">
                    {`${singleRestaurant.deliveryTime || "NA"} min`}
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>

        {/* Menu */}
        <AvailableMenu menus={singleRestaurant?.menus || []} />
      </div>
    </div>
    </motion.div>
  );
}

export default RestaurantDetails;
