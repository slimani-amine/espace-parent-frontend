import { useUser } from "../../hooks/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  // 1 Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2 if there is no authenticated user redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 3 while loading, show a spinner
  if (isLoading) {
    return <Spinner />;
  }

  // 4 if there is a user, render the app
  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;
