import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

function AdminRoute() {
  const { user } = useAuth();

  if (user?.role !== "ADMIN") {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;