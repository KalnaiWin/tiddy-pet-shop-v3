import { Outlet } from "react-router";
import { Navbar } from "../pages/home/Navbar";

export const MainLayout = () => {
  return (
    <>
      <div className="fixed top-0 left-0 z-20 w-full">
        <Navbar />
      </div>
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
};
