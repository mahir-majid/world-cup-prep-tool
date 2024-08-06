// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from  'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsAuthorized(true);
      setAccessToken(token);
    }
  }, []);

  const login = (token) => {
    sessionStorage.setItem("accessToken", token);
    setIsAuthorized(true);
    setAccessToken(token);
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setIsAuthorized(false);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
