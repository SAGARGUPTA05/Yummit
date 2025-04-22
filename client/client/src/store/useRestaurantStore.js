import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";



const API_END_POINT = "http://localhost:3000/api/v1/restaurant";
axios.defaults.withCredentials = true;
export const useRestaurantStore = create(
  persist(
    (set,get) => ({
      loading: false,
      restaurant: null,
      searchRestaurantResult: null,
      appliedFilter:[],
      singleRestaurant:null,
      restaurantOrders:[],

      createRestaurant: async (formData) => {
        set({ loading: true }); // Set loading to true while request is in progress

        try {
          // Simulating an API call (Replace this with your actual API request)
          const res = await axios.post(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (res.data?.success) {
            toast.success(res.data.message);
            set({ loading: false });
          }
        } catch (error) {
          toast.error(error.response.message);
          set({ loading: false });
        }
      },
      getRestaurant: async () => {
        try {
          set({ loading: true });
          const res = await axios.get(`${API_END_POINT}/`);
          if (res.data?.success) {
            const firstRestaurant = res.data.restaurant[0];
            toast.success(res.data.message);
            set({ loading: false, restaurant: firstRestaurant });
            return res.data.restaurant; // ✅ RETURN the restaurant data
          } else {
            set({ loading: false });
            return null; // Optional: handle "not successful" case
          }
        } catch (error) {
          toast.error(error.response.message);
          if (error.response?.status === 404) {
            set({ restaurant: null });
          }
          set({ loading: false });
          toast.error();

          return null; // ✅ RETURN null on error too
        }
      },

      updateRestaurant: async (formData) => {
        try {
          set({ loading: true });
          const res = await axios.put(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.data?.success) {
            toast.success(res.data.message);
            set({ loading: false, restaurant: res.data.restaurant });
          }
        } catch (error) {
          toast.error(error.res.data.message);
          set({ loading: false });
        }
      },
      searchRestaurants: async (searchText, searchQuery, selectCuisines) => {
        try {
          set({ loading: true });
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectCuisines", selectCuisines.join(","));
          const res = await axios.get(
            `${API_END_POINT}/search/${searchText}?${params.toString()}`
          );

          if (res.data?.success) {
            
            set({ loading: false, searchRestaurantResult: res.data });
          }
        } catch (error) {
          set({ loading: false, searchRestaurantResult: null });
        }
      },
      addmenuRestaurant: (menu) => {
        set((state) => ({
          restaurant: state.restaurant
            ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] }
            : null,
        }));
      },
      updateMenuRestaurant: (updatedMenu) => {
        set((state) => {
          if (state.restaurant) {
            const updatedMenuList = state.restaurant.menus.map((menu) =>
              menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return {
              restaurant: { ...state.restaurant, menus: updatedMenuList },
            };
          }
          return {}; // ensure something is returned
        });
      },
      setAppliedFilter:(value)=>{
        set((state)=>{
          const isAlreadyApplied=state.appliedFilter.includes(value);
          const updatedFilter=isAlreadyApplied ? state.appliedFilter.filter((item)=>item != value) : [...state.appliedFilter,value];
           return { appliedFilter:updatedFilter}
        })
      },
      resetAppliedFilter:()=>{
         set({appliedFilter:[]})
      },
      getSingleRestaurant: async(restaurantId)=>{
        try {
          const res=await axios.get(`${API_END_POINT}/${restaurantId}`);
          if(res.data.success){
            set({singleRestaurant:res.data.restaurant
            })
          }
          
        } catch (error) {
          
        }
      },
      getRestaurantOrders:async()=>{
        try {
          const res=await axios.get(`${API_END_POINT}/order`);
          if(res.data.success){
            set({restaurantOrders:res.data.orders});
          }
        } catch (error) {
           toast.error(error.response.message);
        }
      },
      updateRestaurantOrder:async(orderId,status)=>{
        try {
          const res=await axios.put(`${API_END_POINT}/order/${orderId}/status`,{status},{
            headers:{
               'content-Type':'application/json'
            }
          })
          if(res.data.success){
            const updatedOrder=get().restaurantOrders.map((order)=>{
              return  order._id ===orderId ? {...order,status:res.data.status}:order;
            })
            set({restaurantOrders:updatedOrder})
            toast.success(res.data.message)
          }
          
        } catch (error) {
          toast.error(error.response.message)
        }
      }
      
      
    }),
    { name: "restaurant-store", storage: createJSONStorage(() => localStorage) }
  )
);
