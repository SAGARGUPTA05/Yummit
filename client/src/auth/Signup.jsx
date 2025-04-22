import React, { useState } from "react";
import {
  Mail,
  User2,
  LockKeyholeIcon,
  Loader2,
  PhoneCallIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { userSignupSchema } from "../schema/userSchema";
import { z } from "zod";
import { useUserStore } from "../store/useUserStore";
import { useThemeStore } from "../store/useThemeStore";
import { motion } from "framer-motion";

function Signup() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    fullname: "",
    contact: "",
    email: "",
    password: "",
    admin: false,
  });

  const { signup, loading } = useUserStore();
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  const changeEventHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const signupSubmitHandler = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      userSignupSchema.parse(input);
      await signup(input);
      navigate("/verify-email");
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
    
    <div
      className={`flex items-center justify-center min-h-screen w-screen ${
        isDark ? "bg-[#121212] text-[#E0E0E0]" : "bg-gradient-to-b from-orange-100 via-yellow-100 to-white text-black"
      }`}
    >
      <form
        onSubmit={signupSubmitHandler}
        className={`md:p-8 w-full max-w-md rounded-lg mx-4 ${
          isDark
            ? "bg-[#1E1E1E] border border-[#444444]"
            : "bg-gray-100 border border-gray-200"
        }`}
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl text-center">Yummit</h1>
        </div>

        {/* Full Name */}
        <div className="relative mb-4">
          <input
            type="text"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            placeholder="Enter your full name"
            className={`pl-10 p-2 w-full rounded-md border focus-visible:ring-1 ${
              isDark
                ? "bg-[#121212] border-[#444444] text-[#E0E0E0] placeholder-[#888888]"
                : "bg-white border-gray-300"
            }`}
            required
          />
          <User2
            className={`absolute left-2 inset-y-2 pointer-events-none ${
              isDark ? "text-[#888888]" : "text-gray-500"
            }`}
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm">{errors.fullname}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="Enter your email"
            className={`pl-10 p-2 w-full rounded-md border focus-visible:ring-1 ${
              isDark
                ? "bg-[#121212] border-[#444444] text-[#E0E0E0] placeholder-[#888888]"
                : "bg-white border-gray-300"
            }`}
            required
          />
          <Mail
            className={`absolute left-2 inset-y-2 pointer-events-none ${
              isDark ? "text-[#888888]" : "text-gray-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="Enter your password"
            className={`pl-10 p-2 w-full rounded-md border focus-visible:ring-1 ${
              isDark
                ? "bg-[#121212] border-[#444444] text-[#E0E0E0] placeholder-[#888888]"
                : "bg-white border-gray-300"
            }`}
            required
          />
          <LockKeyholeIcon
            className={`absolute left-2 inset-y-2 ${
              isDark ? "text-[#888888]" : "text-gray-500"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Contact */}
        <div className="relative mb-4">
          <input
            type="text"
            name="contact"
            value={input.contact}
            onChange={changeEventHandler}
            placeholder="Enter your contact"
            className={`pl-10 p-2 w-full rounded-md border focus-visible:ring-1 ${
              isDark
                ? "bg-[#121212] border-[#444444] text-[#E0E0E0] placeholder-[#888888]"
                : "bg-white border-gray-300"
            }`}
            required
          />
          <PhoneCallIcon
            className={`absolute left-2 inset-y-2 pointer-events-none ${
              isDark ? "text-[#888888]" : "text-gray-500"
            }`}
          />
          {errors.contact && (
            <p className="text-red-500 text-sm">{errors.contact}</p>
          )}
        </div>

        {/* Admin Checkbox */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            name="admin"
            id="admin"
            checked={input.admin}
            onChange={changeEventHandler}
          />
          <label htmlFor="admin" className="text-sm">
            Register as Admin
          </label>
        </div>

        {/* Submit Button */}
        <div className="mb-6">
          <button
            type="submit"
            disabled={loading}
            className="btn-orange w-full flex items-center justify-center p-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Signup"
            )}
          </button>
        </div>

        <hr className={isDark ? "border-[#444444]" : "border-gray-300"} />

        {/* Login redirect */}
        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
    
  );
}

export default Signup;
