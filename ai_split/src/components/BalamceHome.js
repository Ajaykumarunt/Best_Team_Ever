import React from 'react'
import add from "../add.png"
const triggerImageUpload = () => {
  const fileInput = document.getElementById('imageUpload');
  if (fileInput) {
    fileInput.click();
  }
};
const UploadButton = () => {
  const triggerImageUpload = () => {
    const fileInput = document.getElementById('imageUpload');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the selected file here
      console.log('Selected file:', file.name);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="imageUpload"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      <button onClick={triggerImageUpload}>
        <img src={add} alt="+" /> Add Split
      </button>
    </div>
  );
}
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Handle the selected file here
    console.log('Selected file:', file.name);
  }
};

function BalamceHome({ amount }) {
    return (
    <div className="mai">
      <div className="balance">
        <p>you get back<br></br> ${amount.toFixed(2)}</p>
      </div>

      <div className="butt">
        {/* < /><br></br> */}
        {/* <button >
          <img src={add} alt="+" />Add Split
          </button> */}
                <input
          type="file"
          id="imageUpload"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <button onClick={triggerImageUpload}>
          <img src={add} alt="+" /> Add Split
        </button>
                
      
      </div>
    </div>
  );
}

export default BalamceHome