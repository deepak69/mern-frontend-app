import React, { createContext, useState, useEffect } from "react";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const expirationdate = localStorage.getItem("expirationdate");

  const timer = new Date(expirationdate).getTime() - new Date().getTime();

  setTimeout(() => {
    alert("token expired please login again");
    handleLogout();
  }, timer);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const loggedIn = !!token;
    setIsLoggedIn(loggedIn);

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  const value = {
    isLoggedIn,
    handleLoginSuccess,
    handleLogout,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
