import { Loader, Lock } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

export const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { token } = useParams();
  const navigate = useNavigate();

  const { resetPassword, isChangingPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Hai mật khẩu không khớp nhau.");
      return;
    }

    const success = await resetPassword(token, formData.password);

    if (success) {
      toast.success("Đổi mật khẩu thành công!");
      navigate("/login");
    }
  };

  return (
    <div className="relative w-full h-screen">
      <form
        className="absolute-center w-2/3 border-2 border-base-content rounded-md p-10"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold mb-8">Đặt lại mật khẩu mới</h1>
        <div className="flex flex-col gap-2 my-3">
          <label className="text-xl font-medium">Mật khẩu mới</label>
          <div className="relative w-full">
            <Lock className="text-base-content absolute top-2 left-2" />
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-base-200 focus:outline-accent rounded-md border-1 border-base-content p-2 indent-8"
              placeholder="Nhập mật khẩu"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 my-3">
          <label className="text-xl font-medium">Xác nhận lại mật khẩu</label>
          <div className="relative w-full">
            <Lock className="text-base-content absolute top-2 left-2" />
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="w-full bg-base-200 focus:outline-accent rounded-md border-1 border-base-content p-2 indent-8"
              placeholder="Nhập mật khẩu để xác nhận"
            />
          </div>
        </div>
        <div className="w-full mt-5">
          {isChangingPassword ? (
            <button
              className="flex gap-2 bg-base-content text-base-100 p-2 w-full rounded-md font-medium justify-center opacity-40"
              disabled
            >
              <Loader className="animate-spin" />
              <p>Đang đổi mật khẩu...</p>
            </button>
          ) : (
            <button
              className="bg-base-content text-base-100 p-2 w-full rounded-md font-medium"
              type="submit"
            >
              Đổi mật khẩu
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
