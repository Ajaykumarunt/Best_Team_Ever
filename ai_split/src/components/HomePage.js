import { React, useContext } from "react";
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
  };

  return (
    <div className="flex overflow-hidden">
      <div className="w-1/4">
        <SideNavigation />
      </div>

      <div className="w-3/4 px-16 bg-smokewhite">
        <BalanceComponent amount={70.11} />
        <div className="bg-white px-10 py-6 rounded-lg mt-12 h-3/5 overflow-scroll">
          <MemberComponent name="Member 1" amount={23.43} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
