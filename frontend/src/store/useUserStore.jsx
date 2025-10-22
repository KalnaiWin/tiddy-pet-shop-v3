import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  allUsers: [],
  isGettingAllUsers: false,
  isChangingRole: false,
  isDeletingAccount: false,
  isCreatingAccount: false,
  isBanning: false,

  getAllUsers: async () => {
    set({ isGettingAllUsers: true });
    try {
      const res = await axiosInstance.get("/user/all");
      set({ allUsers: res.data });
    } catch (error) {
      console.error("Error in user frontend", error);
      set({ allUsers: [] });
    } finally {
      set({ isGettingAllUsers: false });
    }
  },

  editRole: async (userId, role) => {
    set({ isChangingRole: true });
    try {
      const res = await axiosInstance.put(`user/edit-role/${userId}`, { role });
      await get().getAllUsers();
      toast.success("Thay đổi thành công");
    } catch (error) {
      console.error("Error in user frontend", error);
      toast.error("Thay đổi thất bại");
    } finally {
      set({ isChangingRole: false });
    }
  },

  deleteAccount: async (userId) => {
    set({ isDeletingAccount: true });
    try {
      const res = await axiosInstance.delete(`user/delete/${userId}`);
      await get().getAllUsers();
      toast.success("Xóa thành công");
    } catch (error) {
      console.error("Error in user frontend", error);
      toast.error("Xóa thất bại");
    } finally {
      set({ isDeletingAccount: false });
    }
  },

  addNewAccount: async (data) => {
    set({ isCreatingAccount: true });
    try {
      await axiosInstance.post("/user/add", data);
      await get().getAllUsers();
      toast.success("Thêm tài khoản thành công");
    } catch (error) {
      console.error("Error in user frontend", error);
      toast.error("Thêm tài khoản thất bại");
    } finally {
      set({ isCreatingAccount: false });
    }
  },

  banUser: async (userId, formData) => {
    set({ isBanning: true });
    try {
      await axiosInstance.put(`user/ban/${userId}`, formData);
      await get().getAllUsers();

      if (formData.banned) {
        toast.success("Ban tài khoản thành công.");
      } else {
        toast.success("Unban tài khoản thành công.");
      }
    } catch (error) {
      console.error("Error in user frontend", error);

      if (formData.banned) {
        toast.error("Ban tài khoản thất bại.");
      } else {
        toast.error("Unban tài khoản thất bại.");
      }
    } finally {
      set({ isBanning: false });
    }
  },
}));
