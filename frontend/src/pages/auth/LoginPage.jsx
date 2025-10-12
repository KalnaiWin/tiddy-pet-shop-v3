import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { InfoShop, IntroduceList } from "../../data/DataList";
import { Loader, Lock, MailsIcon } from "lucide-react";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formData);
  };

  return (
    <div className="relative w-full h-screen flex">
      {/* Right section */}
      <div className="h-full w-1/2 bg-base-content flex justify-center p-10 text-base-100">
        <div className="flex flex-col gap-5">
          <div className="flex w-full justify-center items-center gap-2">
            <img src="/assets/logo.png" alt="Logo" className="size-10" />
            <h1 className="md:text-4xl font-bold">Tiddy Pet Shop</h1>
          </div>
          <p>
            Chào mừng bạn đến với{" "}
            <span className="font-extrabold text-base-300">Tiddy Pet</span>
            {" -"} điểm đến tin cậy dành cho những người yêu thú cưng! Chúng tôi
            chuyên cung cấp đa dạng các sản phẩm chất lượng cao dành cho thú
            cưng như chó, mèo, chim, cá và các loài thú nhỏ khác. Với phương
            châm “Thú cưng khỏe – Chủ nhân vui”, cửa hàng luôn đặt sức khỏe và
            sự thoải mái của các bé lên hàng đầu.
          </p>
          <p>
            Tại <span className="font-extrabold text-base-300">Tiddy Pet</span>
            {" ,"} bạn sẽ tìm thấy:
          </p>
          {/* List */}
          <div className="flex flex-col text-sm gap-2">
            {IntroduceList.map((item, index) => (
              <div key={index} className="flex gap-5">
                <img src={item.icon} alt="image" className="size-10" />
                <div className="">
                  <p className="text-base-300 font-medium">
                    {item.name}
                    {": "}
                  </p>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p>
            Chúng tôi cam kết mang đến sản phẩm{" "}
            <span className="font-extrabold text-base-300">chính hãng</span>,
            giá cả <span className="font-extrabold text-base-300">hợp lý</span>{" "}
            cùng dịch vụ tận tâm để khách hàng và thú cưng luôn cảm thấy hài
            lòng.
          </p>
          <div className="flex w-full justify-between">
            {InfoShop.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="p-2 rounded-full bg-base-100">
                  <img src={item.icon} alt="link" className="size-8" />
                </div>
                <p className="text-base-300 font-medium">{item.name}</p>
                <a href={"/"} className="underline">
                  {item.link}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Left Section */}
      <div className="bg-base-100 w-1/2 h-full relative">
        <form
          onSubmit={handleSubmit}
          className="absolute-center text-base-content border-2 p-10 rounded-md w-2/3"
        >
          {/* Title */}
          <h1 className="font-bold text-4xl mb-3 flex justify-center">
            Đăng nhập
          </h1>
          <div className="flex flex-col gap-2 my-4">
            <label htmlFor="">Email</label>
            <div className="relative w-full">
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
          </div>
          <div className="flex flex-col gap-2 my-4">
            <label htmlFor="" className="w-full flex justify-between">
              <p>Mật khẩu</p>
              <a
                href="/forget-password"
                className="text-sm italic underline opacity-70"
              >
                Quên mật khẩu?
              </a>
            </label>
            <div className="relative w-full">
              <Lock className="text-base-content absolute top-2 left-2" />
              <input
                type="text"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="w-full bg-base-200 focus:outline-accent rounded-md border-1 border-base-content p-2 indent-8"
                placeholder="Nhập mật khẩu"
              />
            </div>
          </div>
          <a href="/signup" className="text-sm italic underline opacity-70">
            Chưa có tài khoản?
          </a>
          <div className="w-full mt-5">
            {isLoggingIn ? (
              <button
                className="flex gap-2 bg-base-content text-base-100 p-2 w-full rounded-md font-medium justify-center opacity-40"
                disabled
              >
                <Loader className="animate-spin" />
                <p>Đang đăng nhập...</p>
              </button>
            ) : (
              <button
                className="bg-base-content text-base-100 p-2 w-full rounded-md font-medium"
                type="submit"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
