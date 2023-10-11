import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState();

  return (
    <AuthContext.Provider value={{currentUser, setcurrentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
