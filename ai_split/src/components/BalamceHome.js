import React, {useState} from 'react'
import add from "../add.png"
import { useNavigate } from 'react-router-dom';
import ExpenseEntryForm from './ExpenseEntryForm';
const triggerImageUpload = () => {
  const fileInput = document.getElementById('imageUpload');
  if (fileInput) {
    fileInput.click();
  }
};
const handleClick = () => {

};
const UploadButton = () => {
  const triggerImageUpload = () => {
    const fileInput = document.getElementById('imageUpload');
    if (fileInput) {
      fileInput.click();
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
  const navigate = useNavigate();
  const [expense, setExpense] = useState('');
  const [group, setGroup] = useState('');
  const handleClick = () => {
    navigate('/expense-entry', {
      state: {
        expense,
        group
      }
    });
  };
}

export default BalamceHome