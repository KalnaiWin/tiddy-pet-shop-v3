import { useAuthStore } from "../../store/useAuthStore";

export const BanPage = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50">
      <h1 className="text-3xl font-bold text-red-600">Account Banned</h1>
      <p className="text-gray-700 text-center max-w-md opacity-50">
        Your account has been banned by the administrator.
      </p>
      <p className="text-gray-700 text-center max-w-md my-3">
        <strong className="underline">Reason:</strong> {authUser.banReason}
      </p>
      <button
        onClick={logout}
        className="px-10 py-2 rounded-md bg-red-600 hover:backdrop-opacity-80 cursor-pointer"
      >
        Đăng xuất tài khoản
      </button>
    </div>
  );
};
