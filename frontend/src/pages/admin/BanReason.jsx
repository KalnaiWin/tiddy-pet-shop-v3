import { useState } from "react";
import { useUserStore } from "../../store/useUserStore";

export const BanReason = ({ userId }) => {
  const { isBanning, banUser, allUsers } = useUserStore();

  const user = allUsers.find((u) => u._id === userId);

  if (!user) return <p>Đang tải thông tin người dùng...</p>;

  const [formData, setFormData] = useState({
    banned: user?.banned || false,
    banReason: user?.banReason || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    banUser(userId, formData);
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <h1>
        Người dùng: <strong className="">{user.name}</strong>
      </h1>
      <div className="flex gap-2 items-center">
        <label>Ban or Unban</label>
        <input
          type="checkbox"
          checked={formData.banned}
          onChange={(e) =>
            setFormData({ ...formData, banned: Boolean(e.target.checked) })
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Ban Reason</label>
        <textarea
          rows={4}
          className="w-full bg-base-200 focus:outline-accent rounded-md border-1 border-base-content p-2 indent-1"
          placeholder="Nhập lý do ban"
          value={formData.banReason}
          onChange={(e) =>
            setFormData({ ...formData, banReason: e.target.value })
          }
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isBanning}
        className={`mt-2 py-2 px-4 rounded-md text-white w-full ${
          isBanning
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {isBanning
          ? "Đang thực thi..."
          : formData.banned
          ? "Ban tài khoản"
          : "Bỏ ban tài khoản"}
      </button>
    </form>
  );
};
