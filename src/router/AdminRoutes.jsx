import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import Layout from "./Layout";
import { mainRoutes } from "./mainRoutes";

const ProtectedRoute = () => {
  const { isUser } = useAuth();

  return isUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
