"use client";
import { createContext, useState, useContext } from "react";

// Create Context
const AuthContext = createContext();

// Create a custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (data) => {
    console.log(data);
    setUserData(data);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserData(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ userData, setUserData, isLoggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
