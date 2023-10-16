import {React, useContext} from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import SideNavigation from "./SideNavigation";

function HomePage() {
  const { setcurrentUser } = useContext(AuthContext);
  const history = useNavigate();
  const handleClick = () => {
    signOut(auth).then((val) => {
      setcurrentUser(null)
      history("/login");
    });
  };
  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavigation />
      </div>
      <div className="3/4">
      <button className="w-24 h-6 bg-red text-smokewhite" onClick={handleClick}>Log Out</button>
      </div>
      
    </div>
  );
}

export default HomePage;
