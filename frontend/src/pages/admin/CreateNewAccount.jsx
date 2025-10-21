import { useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { Lock, MailsIcon, User } from "lucide-react";

export const CreateNewAccount = () => {
  const { addNewAccount, isCreatingAccount } = useUserStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewAccount(formData);
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 my-4">
        <label htmlFor="">Tên tài khoản</label>
        <div className="relative w-full">
          <User className="text-base-content absolute top-2 left-2" />
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full bg-base-200 focus:outline-accent rounded-md border-1 border-base-content p-2 indent-8"
            placeholder="Nhập tên"
          />
        </div>
      </div>
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
        <label htmlFor="">Mật khẩu</label>
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
      <div className="flex gap-2 items-center">
        <label htmlFor="role" className="text-sm font-medium text-gray-700">
          Vai trò
        </label>
        <select
          className=" rounded-lg border border-gray-300 bg-gray-50 px-2 py-1 text-sm text-gray-700 
               focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="customer" className="text-blue-500">
            Customer
          </option>
          <option value="admin" className="text-red-500">
            Admin
          </option>
          <option value="shipper" className="text-green-500">
            Shipper
          </option>
        </select>
      </div>
      {isCreatingAccount ? (
        <button
          disabled
          className="w-full bg-blue-500 p-2 my-4 rounded-md text-white font-medium cursor-not-allowed opacity-60"
        >
          ... Đang tạo
        </button>
      ) : (
        <button
          type="submit"
          className="w-full bg-blue-500 p-2 my-4 rounded-md text-white font-medium cursor-pointer hover:opacity-80"
        >
          Tạo tài khoản
        </button>
      )}
    </form>
  );
};
