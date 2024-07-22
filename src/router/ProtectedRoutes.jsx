import React, { useEffect, useState } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import Layout from "./Layout";
import { mainRoutes } from "./mainRoutes";

const ProtectedRoute = () => {
  // const [loggedIn, setLoggedin] = useState(false);
  const { isUser, isAdmin } = useAuth();
  useEffect(() => {
    console.log(isAdmin);
    console.log(isUser);
    // if (isUser() || isAdmin()) {
    //   setLoggedin(true);
    // }
  }, []);

  return isUser || isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
