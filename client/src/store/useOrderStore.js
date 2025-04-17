import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const API_END_POINT = "http://localhost:3000/api/v1/order";
axios.defaults.withCredentials = true;
export const useOrderStore = create()(
  persist(
    (set) => ({
      loading: false,
      orders: [],
      createCheckoutSession: async (checkOutSession) => {
        try {
          set({ loading: true });
          const res = await axios.post(
            `${API_END_POINT}/checkout/create-checkout-session`,
            checkOutSession,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const session = res.data.session;
          window.location.href = session.url;
          set({ loading: false });
        } catch (error) {
          set({ loading: false });
        }
      },
      getOrderDetails: async () => {
        try {
          set({loading:true});
           const res=await axios.get(`${API_END_POINT}/`);
           set({loading:false,orders:res.data.orders})
           
        } catch (error) {
          set({loading:true});
        }
      },
    }),
    {
      name: "order-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
