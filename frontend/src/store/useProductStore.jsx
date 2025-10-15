import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useProductStore = create((set) => ({
  allProduct: null,
  isLoadingProduct: false,

  getAllProduct: async () => {
    set({ isLoadingProduct: true });
    try {
      const res = await axiosInstance.get("/product/all");
      set({ allProduct: res.data });
    } catch (error) {
      console.error("Error in product frontend", error);
      set({ allProduct: null });
    } finally {
      set({ isLoadingProduct: false });
    }
  },

  

}));
