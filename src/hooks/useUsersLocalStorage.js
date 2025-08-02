import { useState, useEffect } from "react";
import {
  getUsersFromLocalStorage,
  saveUsersToLocalStorage,
  generateUniqueId,
} from "../utils/localStorageHelpers";

const useUsersLocalStorage = () => {
  const [users, setUsers] = useState(() => {
    // Add some dummy users for initial testing if local storage is empty
    const storedUsers = getUsersFromLocalStorage();
    if (storedUsers.length === 0) {
      return [
        {
          id: generateUniqueId(),
          name: "Alice Smith",
          email: "alice@example.com",
          totalOrders: 5,
          totalSpent: 1250.75,
          registrationDate: new Date().toISOString(),
        },
        {
          id: generateUniqueId(),
          name: "Bob Johnson",
          email: "bob@example.com",
          totalOrders: 2,
          totalSpent: 300.0,
          registrationDate: new Date().toISOString(),
        },
        {
          id: generateUniqueId(),
          name: "Charlie Brown",
          email: "charlie@example.com",
          totalOrders: 1,
          totalSpent: 50.2,
          registrationDate: new Date().toISOString(),
        },
      ];
    }
    return storedUsers;
  });

  useEffect(() => {
    saveUsersToLocalStorage(users);
  }, [users]);

  const getUserById = (id) => {
    return users.find((u) => u.id === id);
  };

  return { users, getUserById };
};

export default useUsersLocalStorage;
