import {React, useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import add from "../add.png";
import { AuthContext } from "../contexts/AuthContext";

function BalamceHome({ amount }) {
  const {currentUser} = useContext(AuthContext)
  const [totalBalance, setTotalBalance] = useState(0)

  useEffect(() => {
   const getTotalBalance = () =>{
    let balance = 0
    currentUser.friends.map((friend) => {
      
      balance += friend.balance
    })
    setTotalBalance(balance)
   }

   getTotalBalance();
  }, [])
  
  return (
    <div className="mai flex">
      <div className="bg-white balance flex flex-col w-48 rounded-lg">
        <p>{totalBalance > 0?'you get back':'you owe'}</p>
        <p className={`font-semibold text-2xl ${totalBalance >= 0?'text-dark-green':'text-red'}`}>$ {totalBalance.toFixed(2)}</p>
      </div>
      <Link to="/add_split">
        <div className="butt">
          <button
            className="bg-white p-4 w-32 flex flex-col items-center rounded-lg"
          >
            <img src={add} className="w-8 mb-1" alt="+" /> Add Split
          </button>
        </div>
      </Link>
    </div>
  );
}

export default BalamceHome;
