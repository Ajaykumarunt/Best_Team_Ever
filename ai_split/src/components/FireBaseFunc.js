import {
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  getAuth,
} from "firebase/auth";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

export const firebaseSignup = async (
  auth,
  db,
  email,
  password,
  setcurrentUserId
) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    setcurrentUserId(res.user.uid);
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

export const handleDeleteAccountMain = async (
  auth,
  userID,
  setcurrentUser,
  history
) => {
  try {
    //const data = doc(auth, "users", userID);
    const authe = getAuth();
    const user = authe.currentUser;
    console.log(user);
    //console.log(data);
    await deleteDoc(doc(auth, "users", userID));
    await deleteUser(user).then(() => {
      setcurrentUser(null);
      history("/Best_Team_Ever");
      console.log("deleted");
    });
  } catch (error) {
    console.log(error);
  }
};
