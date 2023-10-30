import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import SideNavigation from "./SideNavigation";

const ActivityPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [FirstName, setFirstName] = useState(currentUser.first_name);
  const [LastName, setLastName] = useState(currentUser.last_name);
  const [email, setEmail] = useState(currentUser.email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    // Handle image upload logic here
  };

  const handleUpdateProfile = () => {
    // Handle profile update logic here
    // Check if the email is in the correct format
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

  const handleLogout = () => {
    // Handle logout logic here
  };

  const handleDeleteAccount = () => {
    // Handle delete account logic here
  };

  return (
    <div className="flex">
      <div className="w-90">
        {/* SideNavigation Component */}
        <SideNavigation />
      </div>
      <div className="main-content bg-zinc-200 w-full">
        <div className="flex flex-col lg:flex-row justify-between w-2/3 mt-10">
          <h1 className="text-5xl font-bold ml-2 lg:ml-20 mr-2 lg:mr-96">
            Account
          </h1>
          <div className="lg:flex justify-center ml-2 lg:ml-80">
            <button
              className="bg-bg-black text-white p-3 text-lg rounded-lg hover:bg-stone-600 mr-6 lg:mr-5"
              type="button"
            >
              Log out
            </button>
            <button
              className="bg-red text-white p-3 rounded-lg text-lg hover:bg-rose-600"
              type="button"
            >
              Delete Account
            </button>
          </div>
        </div>
        <div className="form flex-auto">
          <div className="form-row justify-items-stretch ml-2 lg:ml-80">
            <div className="mt-10">
              <label
                htmlFor="First Name"
                className="text-gray-600 font-semibold"
              >
                First Name
              </label>
              <label
                htmlFor="Last Name"
                className="ml-2 lg:ml-40 text-gray-600 font-semibold"
              >
                Last Name
              </label>
              <label
                htmlFor="email"
                className="ml-2 lg:ml-40 text-gray-600 font-semibold"
              >
                Email
              </label>
            </div>
            <input
              type="text"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="mr-5 rounded-md py-2 px-4 bg-white hover:bg-gray-300 focus:outline-black transition duration-300"
            />
            <input
              type="text"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="mr-5 rounded-md py-2 px-4 bg-white hover:bg-gray-300 focus:outline-black transition duration-300"
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="ml-2.5 rounded-md py-2 px-4 bg-white hover:bg-gray-300 focus:outline-black transition duration-300"
            />
          </div>
          <div className="form-row justify-items-stretch ml-2 lg:ml-80">
            <div className="mt-10">
              <label
                htmlFor="password"
                className="mr-2 text-gray-600 font-semibold"
              >
                Password
              </label>
              <label
                htmlFor="confirm password"
                className="ml-2 lg:ml-44 text-gray-600 font-semibold"
              >
                Confirm Password
              </label>
            </div>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="mr-5 rounded-md py-2 px-4 bg-white hover:bg-gray-300 focus:outline-black transition duration-300"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="ml-2.5 rounded-md py-2 px-4 bg-white hover:bg-gray-300 focus:outline-black transition duration-300"
            />
          </div>
          <div className="flex justify-center image-upload-section rounded-lg">
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
              className="green-button bg-green-400 text-white p-4 rounded-lg text-lg hover:bg-green-600"
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
