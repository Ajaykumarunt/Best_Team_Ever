import Member_1 from "../member1.png";
import Member_2 from "../member2.png";
import Member_3 from "../member3.png";
import React, { useContext,useEffect, useState } from "react";
import { db } from "../firebase.js";
import { AuthContext } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";

const members = ["Member_1"];

const mempic = [Member_1, Member_2, Member_3];


const MemberHome = () => {
  const [friendNames, setFriendNames] = useState([]);
  const [friendBalance, setFriendBalance] = useState([]);
  const [loading, setloading] = useState(false)

  const { currentUserId } = useContext(AuthContext);


  useEffect(() => {
    const fetchFriendNames = async () => {
      if (!db) {
        console.error("Database not initialized");
        return;
      }

      setloading(true)
      console.error(currentUserId);
      if (currentUserId!=null){
       
      const userDoc = doc(db, "users", currentUserId);

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

          //setFriendNames((prevNames) => [...prevNames, ...names]);
          setFriendNames(names);

          let balances = [];
          for (let i = 0; i < userData.friends.length; i++) {
            if (userData.friends[i].balance !== undefined) {
              balances.push(userData.friends[i].balance);
            } else {
              balances.push("0");
            }
          }

          console.log(balances);
          //setFriendBalance((prevBalances) => prevBalances.concat(balances));
          setFriendBalance(balances);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally{
        setloading(false)
      }

    }
    };

    fetchFriendNames();
  }, []);
  console.log(friendBalance);
  return (
    <div className="bg-white px-10 py-6 rounded-lg mt-12 h-5/6 w-full overflow-scroll">
      {loading ? (<p>Loading...</p>):(friendNames.length === 0 ? (
        <p className="text-2xl h-full flex justify-center items-center">No friends to display</p>
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
      ))}
    </div>
  );
};

export default MemberHome;
