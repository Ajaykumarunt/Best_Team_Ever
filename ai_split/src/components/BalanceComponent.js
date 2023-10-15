//import React from 'react'

import add from "../add.png";

const BalanceComponent = ({ amount }) => {
  return (
    <div className="mai">
      <div className="balance">
        <p>
          you get back<br></br> ${amount}
        </p>
      </div>

      <div className="butt">
        {/* < /><br></br> */}
        <button>
          <img src={add} alt="+" />
          Add Split
        </button>
      </div>
    </div>
  );
};

export default BalanceComponent;
