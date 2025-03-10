import { pathname } from "@/lib/pathname";
import { useMeStore } from "@/stores/useMeStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Unauthorized from "./Unauthorized";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, me } = useMeStore();
  const location = useLocation();

  return (
    me && allowedRoles?.includes(me?.type)
    ? <Outlet />
    : isAuthenticated
      ? <Unauthorized />
      : <Navigate to={pathname.publics.login} state={{ from: location }} replace />
  )
};

export default ProtectedRoute;