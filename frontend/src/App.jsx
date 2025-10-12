import { Navigate, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/auth/LoginPage";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { useEffect } from "react";
import { LoadingPage } from "./components/LoadingPage";
import { ForgetPassword } from "./pages/auth/ForgetPassword";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";

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
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
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
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
