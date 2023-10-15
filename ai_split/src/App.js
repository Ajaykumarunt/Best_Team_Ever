// App.js
//import React from 'react';
import './App.css';
//import './person'
import myImage from './person-icon.jpg';
import add from './add.png';
import Member_1 from './member1.png';
import Member_2 from './member2.png';
import Member_3 from './member3.png';

function App() {
  return (
    <div className="app">
      <ProfileComponent />
      <BalanceComponent amount={70.11} />
      
      <MemberComponent name="Member 1" amount={23.43} />
      
    </div>
  );
}

function ProfileComponent() {
  return (
    <div className="profile">
      <img src={myImage} alt="Profile" />
      <p>Hello, UserName</p>
    </div>
  );
}

function BalanceComponent({ amount }) {
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


const members = ["Member_1"];
const mempic = [Member_1, Member_2, Member_3];

function MemberComponent({name,amount}){

return mempic.map(mempic => (
    <div className="Mem" >
        < img src={mempic} alt="Icon" className ="mempic" />
        <p>{members}</p>
        <p>You owe $23.43</p>
    </div>
));
}


export default App;

