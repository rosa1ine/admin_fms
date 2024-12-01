import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if token is missing
  }

  return children;
};

export default ProtectedRoute;
