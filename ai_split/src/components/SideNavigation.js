import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import UserImage from "../user_avatar.png";
import Avatar, { genConfig } from 'react-nice-avatar'

const SideNavigation = () => {
  const {currentUser} = useContext(AuthContext)
  const config = genConfig(currentUser.email) 
  return (
    <div className="bg-bg-black h-screen flex flex-col">
      <div className="account-info h-1/3 flex flex-col justify-center items-center">
        <Link to="/account" aria-label="User Avatar">
          {currentUser.profile_img_url?(
            <img src={currentUser.profile_img_url} alt="User Profile Image" className="w-24 h-24 rounded-full cursor-pointer" />
          ):(
            <Avatar className="w-24 h-24 cursor-pointer" {...config} />
          )
          }
          
        </Link>

        {/* <Link to="/account">
        <div className="user-avatar w-20 h-20 bg-smokewhite rounded-full"></div>
        </Link> */}
        <div>
          <h1 className="text-smokewhite mt-4 text-2xl capitalize">Hello, {currentUser.first_name + ' '+ currentUser.last_name}</h1>
        </div>
      </div>
      <div className="flex flex-col gap-12 justify-start pt-16 pl-20 h-2/3">
        <Link
          className={"text-smokewhite text-5xl font-medium cursor-pointer"}
          to="/"
        >
          Home
        </Link>
        <Link
          className={"text-smokewhite text-5xl font-medium cursor-pointer"}
          to="/groups"
        >
          Groups
        </Link>
        <Link
          className={"text-smokewhite text-5xl font-medium cursor-pointer"}
          to="/activity"
        >
          Activity
        </Link>
      </div>
    </div>
  );
};

export default SideNavigation;
