import Groupnames from "./Groupnames";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import SideNavigation from "./SideNavigation";
import {React, useContext} from "react";


import bmw from "../bmw.jpeg"
import benzjpeg from "../benzjpeg.jpeg"
import audi from "../audi.jpeg"


function Groups() {
  
  const { setcurrentUser } = useContext(AuthContext);
  const history = useNavigate();
  const handleClick = () => {
    signOut(auth).then((val) => {
      setcurrentUser(null)
      history("/Best_Team_Ever");
    });
  };
  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavigation />
      </div>
      <br></br>
      <div className="w-3/4 p-8">
    <div className="flex justify-between items-center mb-12">
      <h2 className="text-4xl font-bold">Groups</h2>
      <button className="bg-green-500 text-white px-5 py-5 rounded">+ Create</button>
    </div>
    <div className=" flex-grow justify-between items-center h-5 flex-wrap">
    <Groupnames name="Group 1 name" image={bmw} amount="You owe $23.43" />
    <Groupnames name="Group 2 name" image={benzjpeg} amount="You borrowed $12.31" />
    <Groupnames name="Group 2 name" image={audi} amount="You borrowed $12.31" />
    </div>
    </div>

    </div>
  );


  return (
    <div>
      <div className="w-1/4">
        <SideNavigation />
      </div>
      
    <div className="w-3/4 p-8">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold">Groups</h2>
      <button className="bg-green-500 text-white px-4 py-2 rounded">+ Create</button>
    </div>
    </div>
    <Groupnames name="Group 1 name" image={bmw} amount="You owe $23.43" />
    <Groupnames name="Group 2 name" image={benzjpeg} amount="You borrowed $12.31" />
    <Groupnames name="Group 2 name" image={audi} amount="You borrowed $12.31" />
  </div>
  );
  }
export default Groups;
