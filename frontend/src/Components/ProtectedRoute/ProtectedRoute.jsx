import { useAuth } from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading ,isLoggedIn} = useAuth();

  if (loading) return <div>Loading...</div>;
  
  if (!isLoggedIn || !user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;