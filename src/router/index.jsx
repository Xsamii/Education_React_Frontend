import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { mainRoutes } from "./mainRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import LoginPage from "../pages/LoginPage";
import Layout from "./Layout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <ProtectedRoute />, children: [...mainRoutes] },
    ],
  },
]);
