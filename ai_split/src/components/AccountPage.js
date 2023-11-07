import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import SideNavigation from "./SideNavigation";
import { handleLogout, handleDeleteAccountMain } from "./FireBaseFunc";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const ActivityPage = () => {
  const { currentUser, setcurrentUser, currentUserId } =
    useContext(AuthContext);
  const [FirstName, setFirstName] = useState(currentUser.first_name);
  const [LastName, setLastName] = useState(currentUser.last_name);
  const [email, setEmail] = useState(currentUser.email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const history = useNavigate();

  const handleImageUpload = (e) => {
    // Handle image upload logic here
  };

  const handleUpdateProfile = () => {
    const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!email.match(emailFormat)) {
      alert("Email is not in a valid format.");
    } else if (newPassword.length < 8) {
      alert("Password should be at least 8 characters long.");
    } else if (newPassword !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
    } else {
      // Valid email format, password, and matching confirm password, proceed with update
      // You can add your profile update logic here
    }
  };

  const handleLogoutClick = () => {
    console.log(db);
    handleLogout(auth, setcurrentUser, history);
  };

  const handleDeleteAccount = async () => {
    // Handle delete account logic here
    try {
      if (window.confirm("Do you want to delete your account?")) {
        //console.log(db);
        handleDeleteAccountMain(db, currentUserId, history);
        //handleLogoutClick();
        //} else {
        //console.log(currentUserId);
      } else {
        console.log("Delete Abort");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavigation />
      </div>
      <div className="main-content bg-smokewhite w-3/4">
        <div className="flex justify-between pt-12 px-16">
          <h1 className="text-5xl font-bold">Account</h1>
          <div className="">
            <button
              className="bg-bg-black text-white p-3 text-lg rounded-lg hover:bg-stone-600 mr-6 lg:mr-5"
              type="button"
              onClick={handleLogoutClick}
            >
              Log out
            </button>
            <button
              className="bg-red text-white p-3 rounded-lg text-lg hover:bg-rose-600"
              type="button"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>
        </div>
        <div className="mt-24">
          <div className="">
            <div className="flex justify-between px-16">
              <div className="flex flex-col">
                <label htmlFor="First Name" className="font-semibold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={FirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="rounded-md py-2 px-4 bg-white border-2 border-black w-64"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="Last Name" className="font-semibold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="rounded-md py-2 px-4 bg-white border-2 border-black w-64"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="font-semibold mb-2">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="rounded-md py-2 px-4 bg-white border-2 border-black w-80"
                />
              </div>
            </div>
          </div>
          <div className="form-row px-16 mt-10">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="mb-2 text-bg-black font-semibold"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="rounded-md py-2 px-4 bg-white border-2 border-black w-64"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="confirm password"
                  className="text-bg-black font-semibold mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="rounded-md py-2 px-4 bg-white border-2 border-black w-64"
                />
              </div>
              <div className="w-80"></div>
            </div>
          </div>
          <div className="flex justify-center image-upload-section rounded-lg mt-12">
            <div className="relative justify-center">
              <label htmlFor="profile-image" className="cursor-pointer block">
                <div className="bg-gray-200 rounded-full p-4 w-16 h-16 flex items-center justify-center transition-transform transform hover:scale-110">
                  <span
                    role="img"
                    aria-label="Upload Image"
                    className="text-6xl justify-center items-center"
                  >
                    📷
                  </span>
                </div>
              </label>
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
          <div className="flex justify-center mt-9">
            <button
              onClick={handleUpdateProfile}
              className="green-button bg-light-green text-bg-black p-4 rounded-lg text-lg w-48"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
