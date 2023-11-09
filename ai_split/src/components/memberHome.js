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
import useUserByEmail from "../customhooks/useUserByEmail";

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
            let friendNames = [];
            friendEmails.forEach(async (email) => {
              const usersRef = collection(db, "users");
              getDocs(query(usersRef, where("email", "==", email))).then(
                (querySnapshot) => {
                  if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                      const userDocData = doc.data();
                      const friendName = userDocData.first_name + ' ' + userDocData.last_name;
                      setFriendNames([...friendNames, friendName])
                    });     
                  }
                }
              );
            });

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
    <div className="bg-white px-10 py-6 rounded-lg mt-12 h-5/6 w-full overflow-scroll">
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
            className="flex justify-between p-2 mt-2 border-b last:border-0 w-full"
          >
            <span>{name}</span>
            <span
              className={`font-medium ${
                friendBalance[index] < 0 ? "text-red" : "text-dark-green"
              }`}
            >
              {friendBalance[index]}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default MemberHome;
