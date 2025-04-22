import { Loader2, Plus, X } from "lucide-react";
import React, { useState } from "react";
import EditMenu from "./EditMenu";
import menuSchema from "../schema/menuSchema";
import { z } from "zod";
import { useMenuStore } from "../store/useMenuStore";
import { useRestaurantStore } from "../store/useRestaurantStore";
import { useThemeStore } from "../store/useThemeStore";
import { motion } from "framer-motion";

function AddMenu() {
  const { restaurant } = useRestaurantStore();
  const { createMenu, updateMenu, loading } = useMenuStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const [open, setOpen] = useState(false);
  const [editMenu, setEditMenu] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedMenu, setSelectedMenu] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });
  


  const changeHandler = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setInput((prev) => ({
        ...prev,
        [name]: e.target.files[0] || undefined,
      }));
    } else {
      setInput((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      menuSchema.parse(input);

      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if (input.image) formData.append("image", input.image);

      await createMenu(formData);
      setInput({ name: "", description: "", price: "", image: null });
      setOpen(false);
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
    <div className={`max-w-6xl mx-auto my-10 ${isDark ? "text-[#E0E0E0]" : ""}`}>
      <div className="flex justify-around items-baseline md:justify-between">
        <h3 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menu
        </h3>
        <button
          onClick={() => setOpen(true)}
          className="btn-orange flex items-center justify-center"
        >
          <Plus className="mr-2" /> Add Menus
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className={`p-6 rounded-lg shadow-lg w-full max-w-lg ${isDark ? "bg-[#1e1e1e] text-[#E0E0E0]" : "bg-white text-black"}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Menu</h3>
              <button
                onClick={() => setOpen(false)}
                className={`${isDark ? "text-[#888888] hover:text-white" : "text-gray-600 hover:text-black"}`}
              >
                <X />
              </button>
            </div>
            <p className="mb-4">Create a menu that will make your restaurant stand out.</p>

            <form onSubmit={submitHandler}>
              {["name", "description", "price"].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-sm font-medium capitalize">
                    {field === "price" ? "Price (Rupees)" : field}
                  </label>
                  {field === "description" ? (
                    <textarea
                      name="description"
                      placeholder="Enter menu description"
                      value={input.description}
                      onChange={changeHandler}
                      className={`w-full border rounded-lg p-2 ${isDark ? "bg-[#121212] border-[#444444] text-[#E0E0E0]" : ""}`}
                    />
                  ) : (
                    <input
                      type={field === "price" ? "number" : "text"}
                      name={field}
                      placeholder={`Enter ${field}`}
                      value={input[field]}
                      onChange={changeHandler}
                      className={`w-full border rounded-lg p-2 ${isDark ? "bg-[#121212] border-[#444444] text-[#E0E0E0]" : ""}`}
                    />
                  )}
                  {errors[field] && (
                    <p className="text-red-500 text-sm">{errors[field]}</p>
                  )}
                </div>
              ))}

              <div className="mb-4">
                <label className="block text-sm font-medium">Upload Menu Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={changeHandler}
                  className={`w-full border rounded-lg p-2 ${isDark ? "bg-[#121212] border-[#444444] text-[#E0E0E0]" : ""}`}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full btn-orange py-2 rounded-lg flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" /> Please wait
                  </>
                ) : (
                  "Save Menu"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Menu List */}
      <div className="mt-6 space-y-4">
        {restaurant?.menus?.length > 0 ? (
          restaurant.menus.map((data, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg ${isDark ? "bg-[#1e1e1e]" : "bg-white"}`}
            >
              <img
                className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
                src={data.image}
                alt="Menu Item"
              />
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${isDark ? "text-[#E0E0E0]" : "text-gray-800"}`}>{data.name}</h3>
                <p className={`text-md mt-1 ${isDark ? "text-[#B0B0B0]" : "text-gray-600"}`}>{data.description}</p>
                <h3 className="text-md font-semibold mt-2">
                  Price: <span className="text-[#D19254]">₹{data.price}</span>
                </h3>
              </div>
              <button
                onClick={() => {
                  setSelectedMenu(data);
                  setEditMenu(true);
                }}
                className="btn-orange mt-2"
              >
                Edit
              </button>
            </div>
          ))
        ) : (
          <p className={`text-center ${isDark ? "text-[#B0B0B0]" : "text-gray-500"}`}>
            No menus available
          </p>
        )}
      </div>

      {editMenu && (
        <EditMenu selectedMenu={selectedMenu} setEditMenu={setEditMenu} />
      )}
    </div>
    </motion.div>
  );
}

export default AddMenu;
