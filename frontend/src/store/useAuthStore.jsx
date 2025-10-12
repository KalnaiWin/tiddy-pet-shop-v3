import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: false,
  isLoggingIn: false,
  isSignUp: false,
  isSendingResetPassword: false,
  isChangingPassword: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in authUser", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSignUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Đã tạo tài khoản thành công");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSignUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Chào mừng bạn đã tới");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      toast.success("Đăng xuất thành công");
      set({ authUser: null });
    } catch (error) {
      toast.error("Logout failed");
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Đổi ảnh thành công");
    } catch (error) {
      console.error(
        "Update profile error:",
        error.response?.data || error.message
      );
      toast.error("Updated failed");
    }
  },

  forgetPassword: async (data) => {
    set({ isSendingResetPassword: true });
    try {
      await axiosInstance.post("/auth/forget-password", data);
      toast("Đã gửi link đổi mật khẩu vào gmail của bạn.");
    } catch (error) {
      console.error("Error at frontend ForgetPassword: ", error);
      toast.error("Gửi không thành công");
    } finally {
      set({ isSendingResetPassword: false });
    }
  },

  resetPassword: async (token, password) => {
    set({ isChangingPassword: true });
    try {
      await axiosInstance.post(`/auth/reset-password/${token}`, {
        password,
      });
      toast.success("Đổi mật khẩu thành công");
    } catch (error) {
      console.error("Error at frontend ResetPassword: ", error);
      toast.error("Đổi mật khẩu không thành công");
    } finally {
      set({ isChangingPassword: false });
    }
  },
}));
