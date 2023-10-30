import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [currentUserId, setcurrentUserId] = useState(null)
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setcurrentUser, currentUserId, setcurrentUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
