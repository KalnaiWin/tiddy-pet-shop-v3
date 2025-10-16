import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useProductStore = create((set) => ({
  allProduct: null,
  isLoadingProduct: false,
  isCreatingProduct: false,

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

  createProduct: async (data) => {
    set({ isCreatingProduct: true });
    try {
      const res = await axiosInstance.post("/product/create", data);
      set({ allProduct: res.data });
      toast.success("Thêm sản phẩm mới thành công");
    } catch (error) {
      console.error("Error in creatong product frontend", error);
      toast.error(error.response?.data?.message || "Không thể tạo sản phẩm");
    } finally {
      set({ isCreatingProduct: false });
    }
  },
}));
