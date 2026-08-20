import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader } from '../components/ui/Loader';

export function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <Loader fullScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function PublicRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <Loader fullScreen />;
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
}
