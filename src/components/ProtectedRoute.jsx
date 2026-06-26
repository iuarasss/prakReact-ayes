import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";

export default function ProtectedRoute({
  children,
  role,
  redirectTo = "/login",
}) {
  const { user, profile, loading } = useAuth();

  // Still loading session
  if (loading) {
    return <Loading />;
  }

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Role check: if role is specified, user must match or be Admin
  if (role && profile?.role !== role && profile?.role !== "Admin") {
    return <Navigate to="/403" replace />;
  }

  return children;
}
