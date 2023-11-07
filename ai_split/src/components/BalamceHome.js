import React from "react";
import { Link } from "react-router-dom";
import add from "../add.png";

function BalamceHome({ amount }) {
  return (
    <div className="mai flex">
      <div className="bg-white balance flex flex-col w-48 rounded-lg">
        <p>you get back</p>
        <p className="font-semibold text-2xl">${amount.toFixed(2)}</p>
      </div>
      <Link to="/split_options">
        <div className="butt">
          <button
            className="bg-white p-4 w-32 flex flex-col items-center rounded-lg"
          >
            <img src={add} className="w-8 mb-1" alt="+" /> Add Split
          </button>
        </div>
      </Link>
    </div>
  );
}

export default BalamceHome;
