import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";
import { data } from "react-router-dom";

const API_END_POINT = "http://localhost:3000/api/v1/user";
axios.defaults.withCredentials = true;

export const useUserStore = create()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      // Signup API implementation
      signup: async (input) => {
        try {
          set({ loading: true });

          const res = await axios.post(`${API_END_POINT}/signup`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (res.data?.success) {
            //  Optional chaining for safety
         
            toast.success(res.data.message);
            set({ loading: false, user: res.data.user, isAuthenticated: true });
          } else {
            throw new Error(res.data?.message || "Signup failed");
          }
        } catch (error) {
          console.error(
            "Signup API Error:",
            error.response?.data || error.message
          );
          toast.error(error.response?.data?.message || "Signup failed");
          set({ loading: false });
        }
      },
      //login API implementation
      login: async (input) => {
        try {
          set({ loading: true });

          const res = await axios.post(`${API_END_POINT}/login`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (res.data?.success) {
            //  Optional chaining for safety

            toast.success(res.data.message);
            set({ loading: false, user: res.data.user, isAuthenticated: true });
          } else {
            throw new Error(res.data?.message || "Login failed");
          }
        } catch (error) {
          console.error(
            "Login API Error:",
            error.response?.data || error.message
          );
          toast.error(error.response?.data?.message || "Login failed");
          set({ loading: false });
        }
      },

      //login API implementation
      verifyEmail: async (verificationCode) => {
        try {
          set({ loading: true });

          const res = await axios.post(
            `${API_END_POINT}/verify-email`,
            { verificationCode },
            { headers: { "Content-Type": "application/json" } } // ✅ Corrected headers
          );

          if (res.data?.success) {
            toast.success(res.data.message);
            set({ loading: false, user: res.data.user, isAuthenticated: true });
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Verification failed"); // ✅ Corrected error handling
          set({ loading: false });
        }
      },
      //chekcAuthentication API implementation
      checkAuthentication: async () => {
        try {
          set({ isCheckingAuth: true });
          const res = await axios.get(`${API_END_POINT}/check-auth`);
          if (res.data?.success) {
            set({
              loading: false,
              user: res.data.user,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          }
        } catch (error) {
          set({
            loading: false,
            isAuthenticated: false,
            isCheckingAuth: false,
          });
        }
      },

      //logout API implementation
      logout: async () => {
        try {
          set({ loading: true });
          const res = await axios.post(`${API_END_POINT}/logout`);
          if (res.data?.success) {
            toast.success(res.data.message);
            localStorage.removeItem("hasLoggedInOnce");

            set({ loading: false, isAuthenticated: false, user: null });
          }
        } catch (error) {
          toast.success(res.data.message);
          set({ loading: false });
        }
      },

      //forget password API implementation
      forgetPassword: async (email) => {
        try {
          set({ loading: true });
          const res = await axios.post(`${API_END_POINT}/forget-password`, {
            email,
          });
          if (res.data?.success) {
            toast.success("you will recived the reset link in your registered email");
            set({ loading: false });
          }
        } catch (error) {
          toast.success(res.data.message);
          set({ loading: false });
        }
      },
        //reset Password API implementation
      resetPassword: async (token, newPassword) => {
        try {
          set({ loading: true });
          const res = await axios.post(
            `${API_END_POINT}/reset-password/${token}`,
            { newPassword }
          );
          if (res.data?.success) {
            toast.success("Password changed successfully");
            set({ loading: false });
          }
        } catch (error) {
          toast.success(res.data.message);
          set({ loading: false });
        }
      },
        //updateProfile API implementation
        updateProfile: async (formData) => {
          try {
            
            const res = await axios.put(
              `${API_END_POINT}/profile/update`,
              formData // <- FormData
            );
            if (res.data?.success) {
              toast.success(res.data.message);
            }
            
          } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
            
          }
        },
        
    }),
    {
      name: "user-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
