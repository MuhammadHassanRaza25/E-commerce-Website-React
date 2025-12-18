import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(JSON.parse(localStorage.getItem("isAdmin")) || false);

  const adminLogin = () => {
    setIsAdmin(true);
    localStorage.setItem("isAdmin", "true");
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.setItem("isAdmin", "false");
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
};
