import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext.tsx';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { authToken } = useAuth();

  // If the user is not authenticated, navigate to the login page
  if (!authToken) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the child component
  return children;
};

export default PrivateRoute;