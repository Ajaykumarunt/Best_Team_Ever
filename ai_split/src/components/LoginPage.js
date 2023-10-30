import { React, useContext, useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

import logo from "../assets/logo.png";
import ErrorPopup from "./ErrorPopup";
import { AuthContext } from "../contexts/AuthContext";
import { firebaseSignup } from "./FireBaseFunc";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState("");
  const [error, seterror] = useState("");
  const { setcurrentUser, currentUserId, setcurrentUserId } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      seterror("Fill all fields");
      return;
    }
    seterror("");
    setloading(true);
    try {
      const userData = await firebaseSignup(auth, db, email, password, setcurrentUserId);
      setcurrentUser(userData);
      navigate("/");
    } catch (err) {
      console.log(err);
      setloading(false);
      seterror("Invalid email/password");
    }
  };
  console.log(currentUserId)
  return (
    <div className="bg-bg-black h-screen">
      {error && <ErrorPopup message={error} />}
      <div className="logo pt-12 flex justify-center items-center">
        <img src={logo} alt="logo"></img>
      </div>
      <div className="form flex justify-center items-center mt-16">
        <div className="bg-smokewhite w-96 rounded-md">
          <div className="form-body p-8">
            <form className="flex flex-col">
              <input
                className="p-2 border-2 border-black rounded-md mb-4"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
              <input
                className="p-2 border-2 border-black rounded-md mb-4"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
              <button
                disabled={loading}
                className="bg-light-green p-2 rounded-md disabled:bg-gray-400"
                type="submit"
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-16">
        <Link className="text-smokewhite" to="/signup">
          Register Account
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
