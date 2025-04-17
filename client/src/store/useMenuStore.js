import axios from "axios";

import { toast } from "react-toastify";
import { create } from "zustand";
import { createJSONStorage ,persist} from "zustand/middleware";
import { useRestaurantStore } from "./useRestaurantStore";
const API_END_POINT = "http://localhost:3000/api/v1/menu";
axios.defaults.withCredentials = true;
export const useMenuStore = create()(
  persist(
    (set) => ({
      loading: false,
      menu: null,
      createMenu: async (formData) => {
        try {
          set({ loading: true });
          const res = await axios.post(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.data?.success) {
            toast.success(res.data.message);
            set({ loading: false, menu: res.data.menu });
          }
          //update restaurant
          useRestaurantStore.getState().addmenuRestaurant(res.data.menu)
        } catch (error) {
        
          toast.error(error?.response?.data?.message || "Something went wrong");

          set({ loading: false });
        }
      },
      updateMenu: async (menuId,formData) => {
        try {
          set({ loading: true });
          const res = await axios.put(`${API_END_POINT}/${menuId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.data?.success) {
            toast.success(res.data.message);
            set({ loading: false, menu: res.data.menu });
          }

          //update restaurant menu
          useRestaurantStore.getState().updateMenuRestaurant(res.data.menu);
        } catch (error) {
          toast.error(error.response.message);
          set({ loading: false });
        }
      },
      deleteMenu: async () => {},
    }),
    {
      name: "user-menu",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
