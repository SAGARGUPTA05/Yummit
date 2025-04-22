import React, { useEffect, useState } from "react";
import { z } from "zod";
import restaurantSchema from "../schema/restaurantSchema";
import { useRestaurantStore } from "../store/useRestaurantStore";
import { Loader } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { motion } from "framer-motion";

function Restaurant() {
  const {
    createRestaurant,
    loading,
    restaurant,
    updateRestaurant,
    getRestaurant,
  } = useRestaurantStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  const [input, setInput] = useState({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: "",
    cuisines: [], // Keep cuisines as an array
    image: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const existingRestaurant = await getRestaurant();

        if (
          Array.isArray(existingRestaurant) &&
          existingRestaurant.length > 0
        ) {
          const restaurantData = existingRestaurant[0];
          setInput({
            restaurantName: restaurantData.restaurantName || "",
            city: restaurantData.city || "",
            country: restaurantData.country || "",
            deliveryTime: restaurantData.deliveryTime || "",
            cuisines: restaurantData.cuisines || [],
            image: null,
          });
        }
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };
    fetchRestaurant();
  }, []); // Dependency array should be empty to fetch once on mount

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setInput((prevState) => ({
        ...prevState,
        [name]: e.target.files[0],
      }));
    } else if (name === "cuisines") {
      // Convert CSV input to an array
      setInput((prevState) => ({
        ...prevState,
        cuisines: value.split(",").map((cuisine) => cuisine.trim()),
      }));
    } else {
      setInput((prevState) => ({
        ...prevState,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      restaurantSchema.parse(input);
      setErrors({});

      const formData = new FormData();
      formData.append("restaurantName", input.restaurantName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines)); // Convert cuisines array to JSON string
      if (input.image) {
        formData.append("image", input.image);
      }

      if (restaurant) {
        await updateRestaurant(formData);
      } else {
        await createRestaurant(formData);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessages = err.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrors(errorMessages);
      }
    }
  };

  return (
    <motion.div
    initial={{ y: "100%", opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: "100%", opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="relative"
  >
    <div
      className={`max-w-6xl mx-auto my-10 ${isDark ? "text-[#E0E0E0]" : ""}`}
    >
      <h3
        className={`font-extrabold text-2xl mb-5 ${
          isDark ? "text-[#E0E0E0]" : "text-gray-900"
        }`}
      >
        Add Restaurant
      </h3>
      <form
        onSubmit={submitHandler}
        className="md:grid grid-cols-2 gap-4 space-y-2 md:space-y-0"
      >
        {[
          {
            label: "Restaurant Name",
            name: "restaurantName",
            type: "text",
            placeholder: "Enter your restaurant name",
          },
          {
            label: "City",
            name: "city",
            type: "text",
            placeholder: "Enter city",
          },
          {
            label: "Country",
            name: "country",
            type: "text",
            placeholder: "Enter country",
          },
          {
            label: "Estimated Delivery Time (minutes)",
            name: "deliveryTime",
            type: "number",
            placeholder: "Enter estimated delivery time",
          },
          {
            label: "Cuisines (comma-separated)",
            name: "cuisines",
            type: "text",
            placeholder: "Enter cuisines",
          },
        ].map((field, i) => (
          <div key={i} className="flex flex-col">
            <label
              htmlFor={field.name}
              className={`font-medium mb-1 ${
                isDark ? "text-[#B0B0B0]" : "text-gray-700"
              }`}
            >
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              placeholder={field.placeholder}
              value={
                field.name === "cuisines"
                  ? input.cuisines.join(", ")
                  : input[field.name]
              }
              onChange={handleChange}
              className={`border rounded-lg p-2 h-12 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                isDark
                  ? "bg-[#121212] text-[#E0E0E0] border-[#444444]"
                  : "bg-white text-black border-gray-300"
              }`}
            />
            {errors[field.name] && (
              <p className="text-red-500">{errors[field.name]}</p>
            )}
          </div>
        ))}

        {/* Upload Image */}
        <div className="flex flex-col">
          <label
            htmlFor="image"
            className={`font-medium mb-1 ${
              isDark ? "text-[#B0B0B0]" : "text-gray-700"
            }`}
          >
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
            className={`border rounded-lg p-2 h-12 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              isDark
                ? "bg-[#121212] text-[#E0E0E0] border-[#444444]"
                : "bg-white text-black border-gray-300"
            }`}
          />
          {errors.image && <p className="text-red-500">{errors.image}</p>}
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-center">
          <button
            type="submit"
            className={`px-6 py-3 btn-orange font-semibold rounded-lg w-full md:w-auto flex items-center justify-center ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : restaurant ? (
              "Update Restaurant"
            ) : (
              "Add Restaurant"
            )}
          </button>
        </div>
      </form>
    </div>
    </motion.div>
  );
}

export default Restaurant;
