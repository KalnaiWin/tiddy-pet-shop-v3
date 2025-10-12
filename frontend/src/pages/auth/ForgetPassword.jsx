import { Loader, MailsIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router";

export const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { isSendingResetPassword, forgetPassword } = useAuthStore();

  const handleSumbit = (e) => {
    e.preventDefault();

    forgetPassword(formData);
  };

  return (
    <div className="relative w-full h-screen">
      <form
        className="absolute-center w-2/3 border-2 border-base-content p-10"
        onSubmit={handleSumbit}
      >
        <div className="flex w-full justify-between">
          {" "}
          <h1 className="text-4xl font-black my-2">Quên mật khẩu</h1>
          <button className="p-2 size-10 bg-base-content text-base-100 rounded-full font-medium">
            <Link to={"/login"}>
              <XIcon />
            </Link>
          </button>
        </div>
        <p className="mb-10">
          Nhập email để chúng tôi có thể gửi cho bạn mã OTP xác nhận qua gmail,
          sau đó bạn có thể đổi mật khẩu
        </p>
        <div className="flex w-full gap-5">
          <div className="relative w-2/3">
            <MailsIcon className="text-base-content absolute top-2 left-2" />
            <input
              type="text"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full bg-base-200 focus:outline-accent rounded-md border-1 border-base-content p-2 indent-8"
              placeholder="Nhập email"
            />
          </div>
          <div className="w-1/3">
            {isSendingResetPassword ? (
              <button
                className="flex gap-2 bg-base-content text-base-100 p-2 w-full rounded-md font-medium justify-center opacity-40"
                disabled
              >
                <Loader className="animate-spin" />
                <p>Đang gửi...</p>
              </button>
            ) : (
              <button
                className="bg-base-content text-base-100 p-2 w-full rounded-md font-medium"
                type="submit"
              >
                Gửi
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
