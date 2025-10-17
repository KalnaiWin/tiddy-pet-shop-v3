import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useProductStore = create((set) => ({
  allProduct: [],
  isLoadingProduct: false,
  isCreatingProduct: false,
  isDeleting: false,

  getAllProduct: async () => {
    set({ isLoadingProduct: true });
    try {
      const res = await axiosInstance.get("/product/all");
      set({ allProduct: res.data });
    } catch (error) {
      console.error("Error in product frontend", error);
      set({ allProduct: [] });
    } finally {
      set({ isLoadingProduct: false });
    }
  },

  createProduct: async (data) => {
    set({ isCreatingProduct: true });
    try {
      const res = await axiosInstance.post("/product/create", data);
      const newProduct = res.data.product;
      set((state) => ({
        allProduct: [...state.allProduct, newProduct],
      }));
      await useProductStore.getState().getAllProduct();
      toast.success("Thêm sản phẩm mới thành công");
    } catch (error) {
      console.error("Error in creatong product frontend", error);
      toast.error(error.response?.data?.message || "Không thể tạo sản phẩm");
    } finally {
      set({ isCreatingProduct: false });
    }
  },

  deleteProduct: async (idProduct) => {
    set({ isDeleting: true });
    try {
      await axiosInstance.delete(`product/delete/${idProduct}`);
      toast.success("Xóa sản phẩm thành công");
      await useProductStore.getState().getAllProduct();
    } catch (error) {
      console.error("Error in creatong product frontend", error);
      toast.error(error.response?.data?.message || "Không thể xóa sản phẩm");
    } finally {
      set({ isCreatingProduct: false });
    }
  },
}));
