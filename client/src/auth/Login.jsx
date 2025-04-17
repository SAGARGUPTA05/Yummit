import React, { useState } from "react";
import { Mail, LockKeyholeIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { userLoginSchema } from "../schema/userSchema";
import { z } from "zod";
import { useUserStore } from "../store/useUserStore";
import { useThemeStore } from "../store/useThemeStore";


function Login() {
  const [errors, setErrors] = useState({});
  const { login, loading } = useUserStore(); // ✅ Ensure 'loading' exists in Zustand
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors before validation

    try {
      userLoginSchema.parse(input); // Validate input with Zod
      await login(input);
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
      className={`flex items-center justify-center min-h-screen w-screen px-4 ${
        isDark ? "bg-[#121212] text-[#E0E0E0]" : "bg-white text-black"
      }`}
    >
      <form
        onSubmit={loginSubmitHandler}
        className={`md:p-8 w-full max-w-md mx-auto rounded-lg p-6 ${
          isDark
            ? "bg-[#1E1E1E] border border-[#444444]"
            : "bg-white border border-gray-200"
        }`}
      >
        <div className="mb-4 text-center">
          <h1 className="font-bold text-2xl">Foodplus</h1>
        </div>

        {/* Email Input */}
        <div className="relative mb-6">
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

        {/* Password Input */}
        <div className="relative mb-6">
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

        {/* Submit Button */}
        <div className="mb-6">
          <button
            type="submit"
            disabled={loading} // ✅ Zustand's 'loading' instead of 'loading'
            className="btn-orange w-full flex items-center justify-center p-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>

        <hr className={isDark ? "border-[#444444]" : "border-gray-300"} />

        {/* Forget Password Link */}
        <Link
          to="/forget-password"
          className={`flex justify-end ${isDark ? "text-[#888888]" : "text-blue-500"}`}
        >
          Forget Password
        </Link>

        {/* Signup Redirect */}
        <p className="text-center mt-2">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className={`text-blue-500 hover:underline ${isDark ? "text-[#888888]" : ""}`}
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
   
  );
}

export default Login;
