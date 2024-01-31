import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ element }) =>
 {
    const { isAuthenticated } = useSelector((state) => state.user);
    console.log(isAuthenticated ,"from secure authentication")
  return isAuthenticated ? element : <Navigate to="/login" replace />;

};

export default ProtectedRoute;
