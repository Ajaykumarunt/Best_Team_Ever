import {React, useContext} from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import SideNavigation from "./SideNavigation";
import Profile from "./profile";
import MemberComponent from "./memberHome.js"
import BalanceComponent from "./BalamceHome"
import '../App.css';
import { handleLogout } from "./FireBaseFunc";
function HomePage() {
  
  const { setcurrentUser } = useContext(AuthContext);
  const history = useNavigate();
  
  const handleLogoutClick = () => {
    handleLogout(auth, setcurrentUser, history);
  }

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavigation />
      </div>
      
      
       <div className="app">
       <div className="flex justify-between w-full">
       <h2 className="text-4xl font-bold">Home</h2>
      
      <button className="w-24 h-15 bg-red text-smokewhite" onClick={handleLogoutClick}>Log Out</button>
      </div>
      <BalanceComponent amount={70.11} />
      <br>
      </br>
      <br></br>
      
      <MemberComponent name="Member 1" amount={23.43} />
      </div>
     
    </div>
    
  );
}

export default HomePage;
