import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Fetch auth data from localStorage or an API
    const fetchAuthData = async () => {
      try {
        const storedAuthData = localStorage.getItem("authData");
        if (storedAuthData) {
          const parsedAuthData = JSON.parse(storedAuthData);
          setAuthData(parsedAuthData);
          setIsUser(parsedAuthData.role === "USER");
          setIsAdmin(parsedAuthData.role === "ADMIN");
        }
      } catch (error) {
        console.error("Failed to fetch auth data:", error);
      }
    };

    fetchAuthData();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post("/auth/login", credentials);
      const token = response.data.accessToken;
      const decodedToken = jwtDecode(token);
      const userData = {
        username: decodedToken.username,
        role: decodedToken.role,
        centerId: decodedToken.centerId,
      };
      console.log(userData);

      setAuthData(userData);
      setIsUser(decodedToken.role === "user");
      setIsAdmin(decodedToken.role === "admin");
      localStorage.setItem("authData", JSON.stringify(userData));
      localStorage.setItem("accessToken", token);

      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        message: "اسم المستخدم أو كلمة المرور غير صحيحة",
      };
    }
  };

  const logout = () => {
    setAuthData(null);
    setIsUser(false);
    setIsAdmin(false);
    localStorage.removeItem("authData");
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ authData, isUser, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
