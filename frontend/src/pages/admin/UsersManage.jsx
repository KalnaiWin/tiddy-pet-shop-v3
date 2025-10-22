import {
  Ban,
  DotIcon,
  Eye,
  MoreVertical,
  PlusCircleIcon,
  Trash,
} from "lucide-react";
import { UserList } from "../../data/DataList";
import { useUserStore } from "../../store/useUserStore";
import { useEffect, useState } from "react";
import { UserLoader } from "../../components/loaders/UserLoader";
import { CreateNewAccount } from "./CreateNewAccount";
import { BanReason } from "./BanReason";
import { ViewProfile } from "./ViewProfile";

export const UsersManage = () => {
  const { allUsers, isGettingAllUsers, getAllUsers, editRole, deleteAccount } =
    useUserStore();

  const [openCreate, setOpenCreate] = useState(false);
  const [openBanReason, setOpenBanReason] = useState(false);
  const [openViewProfileUser, setOpenViewProfileUser] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [selectUserId, setSelectUserId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const user = allUsers.find((i) => i._id === selectUserId);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = allUsers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(allUsers.length / itemsPerPage);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
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

  if (openBanReason) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpenBanReason(false)}
        ></div>
        <div className="relative z-10 bg-white p-8 rounded-2xl shadow-lg w-[30%]">
          <BanReason userId={selectUserId} />
        </div>
      </div>
    );
  }

  if (openDeleteConfirm) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpenDeleteConfirm(false)}
        ></div>
        <div className="relative z-10 bg-white p-8 rounded-2xl shadow-lg w-[30%]">
          <h1 className="text-red-500">
            Người dùng: <strong>{user.name}</strong>
            {" - "}
            <strong>{user.email}</strong>
          </h1>
          <p className="italic text-black/60 mb-4">
            Bạn có chắc chắn sẽ xóa người dùng này không. Sau khi xóa sẽ không
            thể khôi phục lại được
          </p>
          <div className="flex gap-2 w-full">
            <button
              className="px-4 py-1 bg-black text-white opacity-80 w-1/2 rounded-sm cursor-pointer"
              onClick={() => setOpenDeleteConfirm(false)}
            >
              Hủy
            </button>
            <button
              className="px-4 py-1 bg-red-500 text-white opacity-80 w-1/2 rounded-sm cursor-pointer"
              onClick={() => {
                deleteAccount(user._id);
                setOpenDeleteConfirm(false);
              }}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (openViewProfileUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpenViewProfileUser(false)}
        ></div>
        <div className="relative z-10 bg-white p-8 rounded-2xl shadow-lg w-[30%]">
          <ViewProfile userId={selectUserId} />
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
            {currentUsers.map((user) => {
              return (
                <tr key={user._id} className="hover:bg-gray-50 transition-all">
                  <td className="flex items-center gap-2 p-2">
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
                    {user.banned ? (
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
                  <td className="py-4 px-3 text-center relative">
                    <div className="flex justify-end">
                      <button
                        onClick={() => toggleMenu(user._id)}
                        className="p-2 rounded hover:bg-gray-100"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600 z-5" />
                      </button>

                      {openMenuId === user._id && (
                        <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg text-sm z-10">
                          <button
                            onClick={() => {
                              setOpenViewProfileUser(true);
                              setSelectUserId(user._id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50"
                          >
                            <Eye className="w-4 h-4 text-blue-600" />
                            <span>View</span>
                          </button>

                          <button
                            onClick={() => {
                              setOpenBanReason(true);
                              setSelectUserId(user._id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50"
                          >
                            <Ban className="w-4 h-4 text-yellow-600" />
                            <span>Ban</span>
                          </button>

                          <button
                            onClick={() => {
                              setOpenDeleteConfirm(true);
                              setSelectUserId(user._id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50"
                          >
                            <Trash className="w-4 h-4 text-red-600" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex gap-2 justify-center mt-4">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded-md border ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
