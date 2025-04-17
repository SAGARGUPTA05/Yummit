import { Loader2 } from "lucide-react";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { toast } from "react-toastify"; // Added for error messages
import { useThemeStore } from "../store/useThemeStore";
import { motion } from "framer-motion";


function VerifyEmail() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const { verifyEmail, loading } = useUserStore();
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  const handleChange = (value, index) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
    if (value !== "" && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRef.current[index - 1].focus();
      }
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const verificationCode = otp.join("");

    if (verificationCode.length < 6) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }

    try {
      await verifyEmail(verificationCode);
      navigate("/"); // Redirect on success
    } catch (error) {
      toast.error("Verification failed. Try again.");
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
      className={`flex items-center justify-center h-screen w-screen ${
        isDark ? "bg-[#121212] text-[#E0E0E0]" : "bg-white text-black"
      }`}
    >
      <div
        className={`p-8 rounded-md w-full max-w-md flex flex-col gap-10 ${
          isDark
            ? "border-[#444444] bg-[#1E1E1E]"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Verify your email</h1>
          <p className="text-sm">
            Enter the 6-digit code sent to your email address.
          </p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="flex justify-between">
            {otp.map((letter, index) => (
              <input
                type="text"
                ref={(element) => {
                  inputRef.current[index] = element;
                }}
                value={letter}
                maxLength={1}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onChange={(e) => handleChange(e.target.value, index)}
                className={`md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isDark
                    ? "bg-[#121212] text-[#E0E0E0] border-[#444444]"
                    : "bg-white text-black border-gray-300"
                }`}
                key={index}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-orange mt-6 w-full flex items-center justify-center p-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Verify"
            )}
          </button>
        </form>
      </div>
    </div>
    </motion.div>
  );
}

export default VerifyEmail;
