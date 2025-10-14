import { Navigate } from "react-router";

export const ProtectedAdminRoute = ({ authUser, children }) => {
  if (!authUser || authUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};
