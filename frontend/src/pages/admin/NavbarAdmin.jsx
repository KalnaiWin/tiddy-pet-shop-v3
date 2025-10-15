import { Link } from "react-router";
import { NavBarAdminList } from "../../data/DataList";
import { useAuthStore } from "../../store/useAuthStore";
import { LogOut } from "lucide-react";

export const NavbarAdmin = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <div className="h-screen text-base-content p-2 relative">
      <Link to={"/"} className="flex items-center gap-2">
        <img src="/assets/logo.png" alt="Logo" className="size-8" />
        <p className="text-md font-medium">Tiddy Pet</p>
      </Link>
      <hr className="w-full my-5" />
      <div className="flex flex-col gap-5">
        {NavBarAdminList.map((item, index) => (
          <Link to={item.link} key={index} className="flex gap-2">
            <item.icon className={`size-6 ${item.color}`} />
            <p className="">{item.name}</p>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-[5px] w-full p-2 left-0">
        <hr className="w-full my-5" />
        <div className="flex gap-3 items-center text-sm">
          <img
            src={authUser.profilePic || "/assets/logo.png"}
            alt=""
            className="size-10"
          />
          <div className="flex flex-col">
            <p className="font-medium text-base-content">{authUser.name}</p>
            <p>{authUser.email}</p>
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-md bg-base-content text-base-100 cursor-pointer hover:bg-base-300 hover:text-base-content transition-all"
          >
            <LogOut />
          </button>
        </div>
      </div>
    </div>
  );
};
