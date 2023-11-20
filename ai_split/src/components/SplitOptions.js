import React from "react";
import { Link } from "react-router-dom";
import SideNavigation from "./SideNavigation";

const SplitOptions = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavigation />
      </div>

      <div className="bg-smokewhite w-3/4 flex justify-center items-center">
        <div className="flex flex-col gap-6 w-2/4 h-72 rounded-lg justify-center items-center">
          <Link to='/add_split'>
            <button className="bg-white w-72 h-24 rounded-lg p-2 drop-shadow-sm">
              Add Manually
            </button>
          </Link>

          <Link to='/add_split/invoice'>
            <button className="bg-white w-72 h-24 rounded-lg p-2 drop-shadow-sm">
              Scan Invoice
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SplitOptions;
