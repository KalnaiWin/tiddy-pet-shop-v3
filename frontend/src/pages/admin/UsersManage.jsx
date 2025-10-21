import { DotIcon, PlusCircleIcon, Trash } from "lucide-react";
import { UserList } from "../../data/DataList";
import { useUserStore } from "../../store/useUserStore";
import { useEffect, useState } from "react";
import { UserLoader } from "../../components/loaders/UserLoader";
import { CreateNewAccount } from "./CreateNewAccount";

export const UsersManage = () => {
  const { allUsers, isGettingAllUsers, getAllUsers, editRole, deleteAccount } =
    useUserStore();

  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  if (isGettingAllUsers) {
    return <UserLoader />;
  }

  if (openCreate) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpenCreate(false)}
        ></div>
        <div className="relative z-10 bg-white p-8 rounded-2xl shadow-lg w-[30%]">
          <CreateNewAccount />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-base-100 p-5">
      <div className="flex gap-5 w-full">
        <div className="flex gap-5">
          {UserList.map((user, index) => (
            <div
              key={index}
              className={`${user.bg} ${user.text} text-md uppercase flex flex-col gap-2 rounded-md p-2 hover:opacity-50 transition-all duration-200 cursor-pointer`}
            >
              <div className="flex justify-between items-center gap-10">
                <p className="font-medium">{user.role}</p>
                <user.icon className="size-8" />
              </div>
              <p className="text-2xl font-extrabold">23</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full justify-between">
          <div>
            <button
              className="flex gap-2 cursor-pointer hover:opacity-80 p-2 bg-base-300 text-base-content rounded-md"
              onClick={() => setOpenCreate(true)}
            >
              <PlusCircleIcon />
              <p>Add new user</p>
            </button>
          </div>
          <div>
            <input
              type="text"
              className="bg-gray-300 w-full p-1 rounded-md indent-3 text-black border-2"
              placeholder="Tìm tên người dùng"
            />{" "}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto my-10">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Tài khoản</th>
              <th className="px-4 py-3 text-left">Tình trạng</th>
              <th className="px-4 py-3 text-left">Vai trò</th>
              <th className="px-4 py-3 text-left">Ngày</th>
              <th className="px-4 py-3 flex justify-end">Hoạt động</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => {
              return (
                <tr key={user._id} className="hover:bg-gray-50 transition-all">
                  <td className="flex items-center gap-2">
                    <div>
                      <img
                        src={user.profilePic || "/assets/logo.png"}
                        alt="img profile"
                        className="size-8"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="italic">{user.email}</p>
                    </div>
                  </td>
                  <td>
                    {user.status ? (
                      <p className="flex items-center gap-2 text-red-600 font-bold">
                        <DotIcon /> Banned
                      </p>
                    ) : (
                      <p className="flex items-center gap-2 text-green-600 font-bold">
                        <DotIcon /> Active
                      </p>
                    )}
                  </td>
                  <td
                    className={`${
                      user.role === "admin"
                        ? "text-red-500"
                        : user.role === "customer"
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  >
                    <select
                      value={user.role}
                      onChange={(e) => editRole(user._id, e.target.value)}
                    >
                      <option value="admin">admin</option>
                      <option value="customer">customer</option>
                      <option value="shipper">shipper</option>
                    </select>
                  </td>
                  <td>
                    {" "}
                    {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="py-6 px-2 text-center flex justify-end">
                    <button
                      className="text-red-600 hover:underline flex gap-1"
                      onClick={() => deleteAccount(user._id)}
                    >
                      <Trash />
                      <p>Xóa</p>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
