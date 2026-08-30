import { Navigate } from "react-router-dom";

import LoginForm from "../../components/auth/LoginForm";
import { useAuth } from "../../hooks/useAuth";

function LoginPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LoginForm />;
}

export default LoginPage;