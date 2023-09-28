import React from "react";
import logo from "../assets/logo.png";
const SignupPage = () => {
  return (
    <div className="bg-bg-black h-screen">
      <div className="logo pt-12 flex justify-center items-center">
        <img src={logo}></img>
      </div>
      <div className="form flex justify-center items-center mt-16">
        <div className="bg-smokewhite w-1/2 rounded-md">
          <div className="form-body p-6">
            <div className="username">
              <label className="form__label" for="firstName"></label>
              <input
                className="form__input p-2 border-black"
                type="text"
                id="firstName"
                placeholder="First Name"
              />
            </div>
            <div className="lastname">
              <label className="form__label" for="lastName"></label>
              <input
                type="text"
                name=""
                id="lastName"
                className="form__input"
                placeholder="LastName"
              />
            </div>
            <div className="email">
              <label className="form__label" for="email"></label>
              <input
                type="email"
                id="email"
                className="form__input"
                placeholder="Email"
              />
            </div>
            <div className="password">
              <label className="form__label" for="password">
              </label>
              <input
                className="form__input"
                type="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="confirm-password">
              <label className="form__label" for="confirmPassword"></label>
              <input
                className="form__input"
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div class="footer">
            <button type="submit" class="btn">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
