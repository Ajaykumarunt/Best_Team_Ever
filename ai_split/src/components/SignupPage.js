import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import ErrorPopup from "./ErrorPopup";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

const SignupPage = () => {
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [loading, setloading] = useState(false);

  function SubmitButton() {
    if (email && password && password.length > 8 && confirmPassword) {
      return (
        <button
          type="submit"
          className="bg-light-green p-2 rounded-md"
          disabled={loading}
          onClick={handleSignup}
        >
          Submit
        </button>
      );
    } else {
      return (
        <button
          type="submit"
          className="bg-light-green p-2 rounded-md disabled:bg-gray-400"
          disabled={true || loading}
          onClick={handleSignup}
        >
          Submit
        </button>
      );
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log('inside handle signup')

    if (!email || !firstname || !lastname || !password) {
      seterror("Fill all fields");
      return;
    }

    seterror("");

    if (password !== confirmPassword) {
      seterror("Password is not matching");
      return;
    }

    seterror("");

    const usrdata = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      groups:{
        ids:[]
      },
      friends:[
      ]
    };


    console.log(usrdata);
    setloading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        setloading(false);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), usrdata);
        updateProfile(user, {
          displayName: firstname,
        });
        navigate("/Best_Team_Ever");
      })
      .catch((err) => {
        setloading(false);
        seterror(err);
      });
  };

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
                type="text"
                name="first_name"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                required
              />
              <input
                className="p-2 border-2 border-black rounded-md mb-4"
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
                required
              />
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
              <input
                className="p-2 border-2 border-black rounded-md mb-4"
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                required
              />
              <SubmitButton />
            </form>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-16">
        <Link className="text-smokewhite" to="/Best_Team_Ever">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
