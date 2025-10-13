import { Link } from "react-router";
import { NavBarList } from "../../data/DataList";
import { useAuthStore } from "../../store/useAuthStore";
import { LogIn, LogOut } from "lucide-react";
import { DashboardAdmin } from "../admin/DashboardAdmin";
import { ProfileUser } from "../ProfileUser";
import { NavLink } from "react-router";

export const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <div className="flex w-full justify-between px-2 py-3 bg-base-content">
      <Link to={"/"} className="flex items-center gap-2">
        <img src="/assets/logo.png" alt="Logo" className="size-8" />
        <p className="text-base-100 font-bold text-xl">Tiddy Pet</p>
      </Link>
      <div className="flex gap-2 text-base-100 text-sm items-center">
        {NavBarList.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            className={({ isActive }) =>
              `${
                isActive ? "text-base-300 border-b-2 border-base-100" : ""
              } hover:border-base-300 hover:border-b transition-all`
            }
          >
            {item.name}
          </NavLink>
        ))}
        {authUser ? (
          authUser.role === "admin" ? (
            <Link to={"/dashboard"}>
              <DashboardAdmin />
            </Link>
          ) : (
            <Link to={"/profile"}>
              <ProfileUser />
            </Link>
          )
        ) : (
          ""
        )}
        {authUser ? (
          <button
            className="bg-base-100 rounded-md px-2 py-1 cursor-pointer"
            onClick={logout}
          >
            <LogOut className="text-base-content" />
          </button>
        ) : (
          <button className="bg-base-100 rounded-md px-2 py-1 cursor-pointer">
            <Link to={"/login"}>
              <LogIn className="text-base-content" />
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};
