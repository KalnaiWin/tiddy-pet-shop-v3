import { Navigate, Route, Routes } from "react-router";
import { LoginPage } from "./pages/auth/LoginPage";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { useEffect } from "react";
import { LoadingPage } from "./components/LoadingPage";
import { ForgetPassword } from "./pages/auth/ForgetPassword";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { HomePage } from "./pages/home/HomePage";
import { ProfileUser } from "./pages/ProfileUser";
import { DashboardAdmin } from "./pages/admin/DashboardAdmin";
import { ProductPage } from "./pages/ProductPage";
import { ContactPage } from "./pages/ContactPage";
import { MainLayout } from "./layouts/MainLayout";

const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingPage />;

  return (
    <div data-theme="caramellatte" className="h-screen bg-base-100">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/forget-password"
            element={!authUser ? <ForgetPassword /> : <Navigate to={"/"} />}
          />
          <Route
            path="/reset-password/:token"
            element={!authUser ? <ResetPassword /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfileUser /> : <Navigate to="/" />}
          />
          <Route
            path="/dashboard"
            element={
              authUser && authUser.role !== "admin" ? (
                <DashboardAdmin />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/product/:path" element={<ProductPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
