import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import SideNavigation from "./SideNavigation";
import { handleLogout, handleDeleteAccountMain } from "./FireBaseFunc";
import { auth, db } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { IoImageOutline } from "react-icons/io5";

const ActivityPage = () => {
  const { currentUser, setcurrentUser, currentUserId } =
    useContext(AuthContext);
  const [FirstName, setFirstName] = useState(currentUser.first_name);
  const [LastName, setLastName] = useState(currentUser.last_name);
  const [email, setEmail] = useState(currentUser.email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const history = useNavigate();

  console.log(currentUser);

  const handleImageUpload = (event) => {
    const image = event.target.files[0];

    if (!image) {
      return;
    }

    setUploading(true);

    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`Upload progress: ${progress}%`);
      },
      (error) => {
        console.error(error.message);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setProfileImageUrl(downloadURL);
        });
      }
    );
  };
console.log(profileImageUrl)
  const deleteModalHandle = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleUpdateProfile = async () => {
    const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!email.match(emailFormat)) {
      alert("Email is not in a valid format.");
    } else if (newPassword && newPassword.length < 8) {
      alert("Password should be at least 8 characters long.");
    } else if (newPassword && newPassword !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
    } else {
      const currentUserRef = doc(db, "users", currentUserId);
      await updateDoc(currentUserRef, {
        first_name: FirstName,
        last_name: LastName,
        email: email,
        profile_img_url: profileImageUrl,
      });
    }
  };

  const handleLogoutClick = () => {
    console.log(db);
    handleLogout(auth, setcurrentUser, history);
  };

  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;

      if (currentUser.total_balance > 0) {
        console.log("Cannot delete account. User has a positive balance.");
      } else {
        await user.delete();
        await deleteDoc(doc(db, "users", user.uid));
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Error deleting account:", error.message);
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
              onClick={deleteModalHandle}
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
                <div className="bg-white p-4 w-64 h-32 flex flex-col items-center justify-center rounded-lg">
                  <span
                    role="img"
                    aria-label="Upload Image"
                    className="text-6xl justify-center items-center"
                  >
                    <IoImageOutline />
                  </span>
                  <p>Upload profile image</p>
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
        {showDeleteModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-md">
              {currentUser.total_balance > 0 ? (
                <>
                  <div className="flex justify-end pr-2 pl-2 pb-2">
                    <IoClose className="text-xl" onClick={deleteModalHandle} />
                  </div>
                  <p className="mb-4 text-red-500">
                    You cannot delete your account because you have a positive
                    balance.
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-4">
                    Are you sure you want to delete your account?
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={handleDeleteAccount}
                      className="bg-red text-white px-4 py-2 rounded"
                    >
                      Delete Account
                    </button>
                    <button
                      onClick={deleteModalHandle}
                      className="bg-bg-black text-smokewhite px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityPage;
