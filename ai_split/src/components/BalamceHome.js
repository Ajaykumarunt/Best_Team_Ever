import React from "react";
import { Link } from "react-router-dom";
import add from "../add.png";

function BalamceHome({ amount }) {
  const triggerImageUpload = () => {
    const fileInput = document.getElementById("imageUpload");
    if (fileInput) {
      fileInput.click();
    }
  };
  const UploadButton = () => {
    const triggerImageUpload = () => {
      const fileInput = document.getElementById("imageUpload");
      if (fileInput) {
        fileInput.click();
      }
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Handle the selected file here
        console.log("Selected file:", file.name);
      }
    };
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the selected file here
      console.log("Selected file:", file.name);
    }
  };
  return (
    <div className="mai flex">
      <div className="bg-white balance flex flex-col w-48 rounded-lg">
        <p>
          you get back
        </p>
        <p className="font-semibold text-2xl">${amount.toFixed(2)}</p>
      </div>

      <div className="butt">
        <button className="bg-white p-4 w-32 flex flex-col items-center rounded-lg" onClick={triggerImageUpload}>
          <img src={add} className="w-8 mb-1" alt="+" /> Add Split
        </button>
      </div>
    </div>
  );
}

export default BalamceHome;
