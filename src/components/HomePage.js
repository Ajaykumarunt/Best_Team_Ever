import React from "react";

import BalanceComponent from "./BalanceComponent.js";
import MemberComponent from "./MemberComponent.js";
import ProfileComponent from "./ProfileComponent.js";
const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <ProfileComponent username={"Ajay"}/>
      <BalanceComponent amount={70}/>
      <MemberComponent />
    </div>
  );
};

export default HomePage;
