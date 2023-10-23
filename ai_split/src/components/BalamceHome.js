import React from 'react'
import add from "../add.png"
function BalamceHome({ amount }) {
    return (
      <div className="mai">
      <div className="balance">
        <p>you get back<br></br> ${amount.toFixed(2)}</p>  
      </div>
      
      <div className="butt">
      {/* < /><br></br> */}
        <button >
          <img src={add} alt="+" />Add Split
          </button>
          
  
      </div>
      </div>
    );
  }

export default BalamceHome