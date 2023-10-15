import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const history = useNavigate();
  const handleClick = () => {
    signOut(auth).then((val) => {
      console.log(val, "val");
      history("/login");
    });
  };
  return (
    <div>
      <div>HomePage</div>

      <button onClick={handleClick}>signOut</button>
    </div>
  );
}

export default HomePage;
