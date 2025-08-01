// src/context/UserContext.jsx
import React, { createContext, useContext } from "react";
import useUsersLocalStorage from "../hooks/useUsersLocalStorage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { users, getUserById } = useUsersLocalStorage();

  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};
