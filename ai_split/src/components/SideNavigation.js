import { React } from "react";
import { Link } from "react-router-dom";

const SideNavigation = () => {
  return (
    <div className="bg-bg-black h-screen flex flex-col">
      <div className="account-info h-1/3 flex flex-col justify-center items-center">
        <Link to="/account">
        <div className="user-avatar w-20 h-20 bg-smokewhite rounded-full"></div>
        </Link>
        <div>
          <h1 className="text-smokewhite mt-4 text-2xl">Hello, Username</h1>
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
