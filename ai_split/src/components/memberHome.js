import Member_1 from '../member1.png';
import Member_2 from '../member2.png';
import Member_3 from '../member3.png';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase.js';
import { doc, getDoc } from 'firebase/firestore';

const members = ["Member_1"];
const mempic = [Member_1, Member_2, Member_3];

const MemberHome = () => {
  const [friendNames, setFriendNames] = useState([]);
  const [friendBalance, setFriendBalance] = useState([]);

  useEffect(() => {
    const fetchFriendNames = async () => {
      try {
        const userDoc = doc(db, 'users', 'xtSTRqzIHRcqxq4UQIeZIrpojA22');
        const userSnapshot = await getDoc(userDoc); 

        
        const userData = userSnapshot.data();

        if (userData && userData.friends) {
          const names = userData.friends.map(friend => friend.first_name);
          
          setFriendNames(prevNames => [...prevNames, ...names]);

          const balances = userData.friends.map(friend => friend.balance);
          
          setFriendBalance(prevBalances => prevBalances.concat(balances));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFriendNames();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Friends List</h1>
      <div className="bg-white p-4 rounded-lg shadow-md max-h-96 overflow-y-auto">
        {friendNames.map((name, index) => (
          <div key={name} className="flex justify-between p-2 border-b last:border-0">
            <span>{name}</span>
            <span 
              className={`font-medium ${friendBalance[index] < 0 ? 'text-red' : 'text-green-500'}`}>
              {friendBalance[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
);


}

export default MemberHome;
