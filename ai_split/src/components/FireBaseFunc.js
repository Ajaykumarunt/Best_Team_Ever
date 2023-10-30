import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const firebaseSignup = async (auth, db, email, password, setcurrentUserId) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setcurrentUserId(res.user.uid)
      const usrDocRef = doc(db, "users", res.user.uid);
      const usrDocSnap = await getDoc(usrDocRef);
  
      if (usrDocSnap.exists()) {
        return usrDocSnap.data();
      } else {
        throw new Error("No such document!");
      }
    } catch (error) {
      throw error;
    }
  };

  export const handleLogout = async (auth, setcurrentUser, history) => {
    try {
      await signOut(auth);
      setcurrentUser(null);
      history("/Best_Team_Ever");
    } catch (error) {
      console.log(error);
    }
  };
  