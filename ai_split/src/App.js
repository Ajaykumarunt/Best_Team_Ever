<<<<<<< HEAD
// App.js
//import React from 'react';
import './App.css';
//import './person'
import myImage from './person-icon.jpg';
import add from './add.png';
import Member_1 from './member1.png';
import Member_2 from './member2.png';
import Member_3 from './member3.png';
=======
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import { AuthContext } from "./contexts/AuthContext";
import Groups from "./components/Groups";
import Activity from "./components/Activity";
import AccountPage from "./components/AccountPage";
>>>>>>> a3ced30b789825d7231d733d0311bd7c0dd09be7

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/Best_Team_Ever" />;
    //return currentUser ? children : <Navigate to="/login" />;
  };

  return (
<<<<<<< HEAD
    <div className="app">
      <ProfileComponent />
      <BalanceComponent amount={70.11} />
      
      <MemberComponent name="Member 1" amount={23.43} />
      
    </div>
=======
    <Routes>
      <Route
        path="/signup"
        element={currentUser ? <Navigate to="/" /> : <SignupPage />}
      />
      <Route
        path="/"
        element={
          <ProtectRoute>
            <HomePage />
          </ProtectRoute>
        }
      />
      <Route
        path="/groups"
        element={
          <ProtectRoute>
            <Groups />
          </ProtectRoute>
        }
      />
      <Route
        path="/activity"
        element={
          <ProtectRoute>
            <Activity />
          </ProtectRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectRoute>
            <AccountPage />
          </ProtectRoute>
        }
      />
      <Route
        path="/Best_Team_Ever"
        element={currentUser ? <Navigate to="/" /> : <LoginPage />}
      />
    </Routes>
>>>>>>> a3ced30b789825d7231d733d0311bd7c0dd09be7
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

