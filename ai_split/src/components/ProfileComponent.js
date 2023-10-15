//import React from 'react'
import myImage from "../person-icon.jpg";

const ProfileComponent = ({ username }) => {
  return (
    <div className="profile">
      <img src={myImage} alt="Profile" />
      <p>Hello, {username}</p>
    </div>
  );
};

export default ProfileComponent;
