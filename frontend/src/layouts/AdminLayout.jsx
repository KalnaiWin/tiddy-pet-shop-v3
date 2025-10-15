import { Outlet } from "react-router";
import { NavbarAdmin } from "../pages/admin/NavbarAdmin";

export const AdminLayout = () => {
  return (
    <div className="w-full flex h-screen">
      <div className="w-2/10 bg-base-200">
        <NavbarAdmin />
      </div>
      <div className="w-8/10">
        <Outlet />
      </div>
    </div>
  );
};
