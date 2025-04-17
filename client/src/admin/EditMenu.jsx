import { Loader2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import menuSchema from "../schema/menuSchema";

import { useMenuStore } from "../store/useMenuStore";
import { useThemeStore } from "../store/useThemeStore";

function EditMenu({ selectedMenu, setEditMenu}) {

  const {updateMenu,loading}=useMenuStore()
  const {theme}=useThemeStore();
  const isDark = theme === "dark";
  
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
      name: "",
      description: "",
      price: "",
      image: null,
    });

   


  const changeHandler = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setInput((prevState) => ({
        ...prevState,
        [name]: e.target.files[0] || undefined,
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
      menuSchema.parse(input);
      
    const formData=new FormData();
    formData.append("name",input.name)
    formData.append("description",input.description)
    formData.append("price",input.price)
    if(input.image){
      formData.append("image",input.image)
    }
    
    await updateMenu(selectedMenu._id,formData)
    setEditMenu(false)
    
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

    // Initialize input state with selectedMenu values
    useEffect(() => {
        setInput({
          name: selectedMenu.name || "",
          description: selectedMenu.description || "",
          price: selectedMenu.price || "",
          image: null, // Keep this null initially
        });
      }, [selectedMenu, setInput]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isDark ? "bg-[#121212]/75" : "bg-white/75"}`}>
    <div className={`p-6 rounded-lg shadow-lg w-full max-w-lg ${isDark ? "bg-[#121212]" : "bg-white"}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-xl font-bold ${isDark ? "text-[#E0E0E0]" : "text-black"}`}>Edit Menu</h3>
        <button
          onClick={() => setEditMenu(false)}
          className={`${isDark ? "text-[#888888] hover:text-[#E0E0E0]" : "text-gray-600 hover:text-black"}`}
        >
          <X />
        </button>
      </div>
  
      <p className={`${isDark ? "text-[#B0B0B0]" : "text-gray-700"}`}>
        Update your menu to keep your offerings fresh and exciting.
      </p>
  
      <form onSubmit={submitHandler}>
        {["name", "description", "price", "image"].map((field) => (
          <div key={field} className="mb-4">
            <label
              htmlFor={field}
              className={`block text-sm font-medium ${isDark ? "text-[#E0E0E0]" : "text-black"}`}
            >
              {field === "image" ? "Upload Menu Image" : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            {field === "description" ? (
              <textarea
                id={field}
                name={field}
                value={input[field]}
                onChange={changeHandler}
                className={`w-full border rounded-lg p-2 ${isDark ? "bg-[#121212] text-[#E0E0E0] border-[#444444]" : "bg-white text-black border-gray-300"}`}
                placeholder={`Enter menu ${field}`}
              />
            ) : field === "image" ? (
              <input
                type="file"
                id={field}
                name={field}
                onChange={changeHandler}
                className={`w-full border rounded-lg p-2 ${isDark ? "bg-[#121212] text-[#E0E0E0] border-[#444444]" : "bg-white text-black border-gray-300"}`}
              />
            ) : (
              <input
                type={field === "price" ? "number" : "text"}
                id={field}
                name={field}
                value={input[field]}
                onChange={changeHandler}
                className={`w-full border rounded-lg p-2 ${isDark ? "bg-[#121212] text-[#E0E0E0] border-[#444444]" : "bg-white text-black border-gray-300"}`}
                placeholder={`Enter menu ${field}`}
              />
            )}
            {errors[field] && (
              <p className="text-red-500 text-sm">{errors[field]}</p>
            )}
          </div>
        ))}
  
        {loading ? (
          <button
            className="btn-orange flex items-center justify-center w-full"
            disabled
          >
            <Loader2 className="animate-spin mr-2" /> Please wait
          </button>
        ) : (
          <button
            type="submit"
            className="w-full btn-orange py-2 rounded-lg"
          >
            Save Menu
          </button>
        )}
      </form>
    </div>
  </div>
  
  );
}

export default EditMenu;
