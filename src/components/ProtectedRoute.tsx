import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../services/auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
