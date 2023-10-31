import React, { useState, useEffect } from 'react';

//import { Ajay } from '../firebase';
//import React from 'react'
import {getFirestore, collection,getDocs } from "firebase/firestore";
import app from '../firebase.js';
const UsersList = ({ filter }) => {
    const [userNames, setUsersNames] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState({});
    useEffect(() => {
      const fetchData = async () => {
        const db = getFirestore(app);
        const usersCollection = collection(db,'users'); // Assuming your collection is named "users"
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map(doc => doc.data().email); // Assuming each user has a "first_name" field
        setUsersNames(userList);
      };
  
      fetchData();
    }, []);
  
    const handleCheckboxChange = (name) => {
        setSelectedUsers(prev => ({ ...prev, [name]: !prev[name] }));
    };
    return (
    
  
        <div>
          <ul>
            {userNames.map(name => (
            <li key={name} className={'flex items-center ${filter && name.toLowerCase().includes(filter.toLowerCase()) ? "bg-black text-white" : ""}'}>
            <input 
              type="checkbox" 
              checked={!!selectedUsers[name]} 
              onChange={() => handleCheckboxChange(name)}
              className="mr-2" 
            />
            {name}
          </li>
            ))}
          </ul>
        </div>
      );
  }
  
  export default UsersList;