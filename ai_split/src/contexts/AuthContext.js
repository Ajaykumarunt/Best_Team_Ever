import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [currentUserId, setcurrentUserId] = useState(
    JSON.parse(localStorage.getItem("userId"))
  );
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(doc(db, "users", user.uid), (doc) => {
          setcurrentUser(doc.data());
        });
        return () => unsubscribeSnapshot();
      } else {
        setcurrentUser(null);
        setcurrentUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("userId", JSON.stringify(currentUserId));
  }, [currentUser, currentUserId]);

  return (
    <AuthContext.Provider
      value={{ currentUser, setcurrentUser, currentUserId, setcurrentUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
