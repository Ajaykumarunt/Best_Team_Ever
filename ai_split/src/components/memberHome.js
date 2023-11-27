import Member_1 from "../member1.png";
import Member_2 from "../member2.png";
import Member_3 from "../member3.png";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase.js";
import { AuthContext } from "../contexts/AuthContext";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const MemberHome = () => {
  const [friendNames, setFriendNames] = useState([]);
  const [friendBalance, setFriendBalance] = useState([]);
  const [loading, setloading] = useState(false);

  const { currentUserId } = useContext(AuthContext);

  useEffect(() => {
    const fetchFriendNames = async () => {
      if (!db) {
        console.error("Database not initialized");
        return;
      }
      setloading(true);
      if (currentUserId != null) {
        const userDoc = doc(db, "users", currentUserId);

        if (!userDoc) {
          console.error("User document not found");
          return;
        }

        try {
          const userSnapshot = await getDoc(userDoc);

          const userData = userSnapshot.data();
          if (userData && userData.friends) {
            const friendEmails = userData.friends.map((friend) => friend.email);
            console.log(friendEmails)
            let names = [];
            names = await Promise.all(
              friendEmails.map(async (email) => {
                const usersRef = collection(db, "users");
                const querySnapshot = await getDocs(query(usersRef, where("email", "==", email)));
            
                if (!querySnapshot.empty) {
                  return querySnapshot.docs.map((doc) => {
                    const userDocData = doc.data();
                    return userDocData.first_name + " " + userDocData.last_name;
                  });
                }

                return [];
              })
            );
            console.log(names)
            setFriendNames(names)

            let balances = [];
            for (let i = 0; i < userData.friends.length; i++) {
              if (userData.friends[i].balance !== undefined) {
                balances.push(userData.friends[i].balance);
              } else {
                balances.push("0");
              }
            }
            setFriendBalance(balances);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setloading(false);
        }
      }
    };

    fetchFriendNames();
  }, []);

  return (
    <div className="bg-white px-10 py-6 rounded-lg mt-12 h-90 w-full overflow-scroll">
      {loading ? (
        <p>Loading...</p>
      ) : friendNames.length === 0 ? (
        <p className="text-2xl h-full flex justify-center items-center">
          No friends to display
        </p>
      ) : (
        friendNames.map((name, index) => (
          <div
            key={name}
            className="flex justify-between items-center p-2 mt-2 border-b last:border-0 w-full"
          >
            <span className="text-xl font-semibold">{name}</span>
            <div className="flex flex-col items-center">
              <p className="text-sm">{friendBalance[index] < 0 ? "you owe" : "you get"}</p>
              <span
                className={`font-medium text-xl ${
                  friendBalance[index] < 0 ? "text-red" : "text-dark-green"
                }`}
              >
                $ {friendBalance[index]}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MemberHome;
