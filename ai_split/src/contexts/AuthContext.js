
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  
  const [currentUserId, setcurrentUserId] = useState(
    localStorage.getItem("userId")
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem("userId", currentUserId);
    }
  }, [currentUserId]);

  return (
    <AuthContext.Provider value={{ currentUser, setcurrentUser, currentUserId, setcurrentUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

