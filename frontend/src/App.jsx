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
import { AdminLayout } from "./layouts/AdminLayout";
import { ProductManage } from "./pages/admin/ProductManage";
import { ProtectedAdminRoute } from "./components/ProtectedAdminRoute";
import { UsersManage } from "./pages/admin/UsersManage";
import { OrderManage } from "./pages/admin/OrderManage";
import { MessageCustomer } from "./pages/admin/MessageCustomer";
import { Advertisement } from "./pages/admin/Advertisement";
import { CreateProduct } from "./pages/admin/CreateProduct";
import { UpdateProduct } from "./pages/admin/UpdateProduct";

const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingPage />;

  return (
    <div data-theme="caramellatte" className="h-screen bg-base-100">
      <Routes>
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
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={authUser ? <ProfileUser /> : <Navigate to="/" />}
          />

          <Route path="/product/:product" element={<ProductPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedAdminRoute authUser={authUser}>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<DashboardAdmin />} />
          <Route path="/dashboard/product" element={<ProductManage />} />
          <Route path="/dashboard/user" element={<UsersManage />} />
          <Route path="/dashboard/order" element={<OrderManage />} />
          <Route path="/dashboard/message" element={<MessageCustomer />} />
          <Route path="/dashboard/advertise" element={<Advertisement />} />
          <Route path="/dashboard/product/create" element={<CreateProduct />} />
          <Route
            path="/dashboard/product/edit/:id"
            element={<UpdateProduct />}
          />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
