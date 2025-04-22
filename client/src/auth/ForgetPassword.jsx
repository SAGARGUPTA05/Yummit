import React, { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { useThemeStore } from "../store/useThemeStore"; 



function ForgetPassword() {
  const [email, setEmail] = useState("");
  const {forgetPassword} = useUserStore();
  const {loading} = useUserStore();
  const {theme }= useThemeStore();
  const isDark = theme === "dark";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    await forgetPassword(email);
    setEmail("");
  };

  return (
     
    <div
      className={`flex items-center justify-center min-h-screen w-screen ${
        isDark ? "bg-[#121212] text-[#E0E0E0]" : "bg-gradient-to-b from-orange-100 via-yellow-100 to-white text-black"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg mx-4 ${
          isDark ? "bg-[#1E1E1E]" : "bg-gray-100"
        }`}
      >
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Forget Password</h1>
          <p className={`text-sm ${isDark ? "text-[#B0B0B0]" : "text-gray-600"}`}>
            Enter your email address to reset your password
          </p>
        </div>

        <div className="relative w-full">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email address"
            className={`pl-10 w-full py-2 rounded border ${
              isDark
                ? "bg-[#121212] border-[#444444] text-[#E0E0E0] placeholder-[#888888]"
                : "bg-white border-gray-300"
            }`}
          />
          <Mail
            className={`absolute inset-y-0 left-2 my-auto ${
              isDark ? "text-[#888888]" : "text-gray-600"
            }`}
          />
        </div>

        {loading ? (
          <button
            type="button"
            className="btn-orange text-white flex items-center justify-center"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </button>
        ) : (
          <button type="submit" className="btn-orange">
            Send Reset Link
          </button>
        )}

        <span className="text-center">
          Back to{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline"
          >
            Login
          </Link>
        </span>
      </form>
    </div>
    
  );
}

export default ForgetPassword;
