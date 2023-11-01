
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [currentUserId, setcurrentUserId] = useState(JSON.parse(localStorage.getItem("userId")))

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("userId", JSON.stringify(currentUserId));
  }, [currentUser, currentUserId]);

  return (
    <AuthContext.Provider value={{ currentUser, setcurrentUser, currentUserId, setcurrentUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

