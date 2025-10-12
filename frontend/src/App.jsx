import { Navigate, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { LoadingPage } from "./components/LoadingPage";
import { ForgetPassword } from "./pages/ForgetPassword";

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
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </div>
  );
};

export default App;
