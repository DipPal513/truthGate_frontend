import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ element }) =>
 {
    const { isAuthenticated } = useSelector((state) => state.user);
    
  return isAuthenticated ? element : <Navigate to="/login" replace />;

};

export default ProtectedRoute;
