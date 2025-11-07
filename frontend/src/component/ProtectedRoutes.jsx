import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AuthRoute = () => {
  const { userData } = useSelector((state) => state.user);
  return userData ? <Navigate to="/" replace /> : <Outlet />;
};

export const PrivateRoute = () => {
  const { userData } = useSelector((state) => state.user);
  return userData ? <Outlet /> : <Navigate to="/login" replace />;
};