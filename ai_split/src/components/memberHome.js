import Member_1 from "../member1.png";
import Member_2 from "../member2.png";
import Member_3 from "../member3.png";
import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";

const members = ["Member_1"];
const mempic = [Member_1, Member_2, Member_3];

const MemberHome = () => {
  const [friendNames, setFriendNames] = useState([]);
  const [friendBalance, setFriendBalance] = useState([]);

  useEffect(() => {
    const fetchFriendNames = async () => {
      if (!db) {
        console.error("Database not initialized");
        return;
      }

      const userDoc = doc(db, "users", "wWyIkz8FWWagXyWr7Ngpsd1F1cT2");
      if (!userDoc) {
        console.error("User document not found");
        return;
      }

      try {
        const userSnapshot = await getDoc(userDoc);

        const userData = userSnapshot.data();
        if (userData && userData.friends) {
          const names = userData.friends.map((friend) => friend.first_name);

          console.log(userData.friends[0]);
          console.log(userData.friends[1]);

          setFriendNames((prevNames) => [...prevNames, ...names]);

          let balances = [];
          for (let i = 0; i < userData.friends.length; i++) {
            if (userData.friends[i].balance !== undefined) {
              balances.push(userData.friends[i].balance);
            } else {
              balances.push("0");
            }
          }

          console.log(balances);
          setFriendBalance((prevBalances) => prevBalances.concat(balances));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFriendNames();
  }, []);
  console.log(friendBalance);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Friends List</h1>
      <div className="bg-white p-4 rounded-lg shadow-md max-h-96 overflow-y-auto">
        {friendNames.length === 0 ? (
          <div className="text-center py-4">No Friends</div>
        ) : (
          friendNames.map((name, index) => (
            <div
              key={name}
              className="flex justify-between p-2 border-b last:border-0"
            >
              <span>{name}</span>
              <span
                className={`font-medium ${
                  friendBalance[index] < 0 ? "text-red" : "text-green-500"
                }`}
              >
                {friendBalance[index]}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );

};

export default MemberHome;
