import { React, useContext } from "react";
import SideNavigation from "./SideNavigation";
import Profile from "./profile";

import MemberComponent from "./memberHome.js"
import BalanceComponent from "./BalamceHome"
import '../App.css';

function HomePage() {

  return (
    <div className="flex overflow-hidden">
      <div className="w-1/4">
        <SideNavigation />
      </div>

      <div className="w-3/4 px-16 bg-smokewhite">
        <BalanceComponent amount={70.11} />
        <div className="h-3/5">
          <MemberComponent name="Member 1" amount={23.43} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
