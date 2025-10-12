import React from "react";
import { useAuthStore } from "../store/useAuthStore";

export const HomePage = () => {
  const { logout } = useAuthStore();

  return (
    <div>
      HomePage
      <button onClick={logout} className="bg-amber-700 p-5 rounded-md">
        Log Out
      </button>
    </div>
  );
};
