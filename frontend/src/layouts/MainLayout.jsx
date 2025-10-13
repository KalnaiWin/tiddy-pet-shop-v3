import { Outlet, useLocation } from "react-router";
import { Navbar } from "../pages/home/Navbar";

export const MainLayout = () => {
  const location = useLocation();

  const hideNavbarOn = ["/login", "/signup"];

  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && (
        <div className="fixed top-0 left-0 z-20 w-full">
          <Navbar />
        </div>
      )}
      <div className={!shouldHideNavbar ? "py-16" : ""}>
        <Outlet />
      </div>
    </>
  );
};
