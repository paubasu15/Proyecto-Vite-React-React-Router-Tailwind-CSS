import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser, removeUser] = useLocalStorage("auth_user", null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username, password) => {
    setIsLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "password") {
        const userData = {
          id: 1,
          username: "admin",
          name: "Administrador",
          token: "fake-jwt-token-123",
          roles: ["admin"],
          loginTime: new Date().toISOString(),
        };

        setUser(userData);
      }
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    removeUser();
  };

  const updateProfile = (profileData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...profileData,
    }));
  };

  const value = {
    user,
    login,
    logout,
    updateProfile,
    isLoading,
    isAuthenticated: !!user,
    clearAuth: removeUser,
    hasRole: (role) => user?.roles?.includes(role) || false,
    getToken: () => user?.token || null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthStorage = () => {
  const [authData, setAuthData, removeAuthData] = useLocalStorage("auth_data", {
    rememberMe: false,
    lastLoginTime: null,
    preferences: {},
  });

  return {
    authData,
    setAuthData,
    removeAuthData,
    updatePreferences: (prefs) =>
      setAuthData((prev) => ({
        ...prev,
        preferences: { ...prev.preferences, ...prefs },
      })),
  };
};
