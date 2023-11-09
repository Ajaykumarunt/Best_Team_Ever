import { React, useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import SideNavigation from "./SideNavigation";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.js";

function Groups() {
  const { currentUserId } = useContext(AuthContext);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const userDoc = doc(db, "users", currentUserId);
      let groupNames = []

      if (!userDoc) {
        console.error("User document not found");
        return;
      }

      try {
        const userSnapshot = await getDoc(userDoc);
        const userData = userSnapshot.data();
        if (userData && userData.groups) {
          const groupIds = userData.groups.ids;
          console.log(groupIds)
          
          const groupFetchPromises = groupIds.map(async id => {
            const groupDocRef = doc(db, "groups", id);
            const groupDocSnap = await getDoc(groupDocRef);
            return groupDocSnap.data().groupName;
          });
  
          const groupNames = await Promise.all(groupFetchPromises);
          setUserGroups(groupNames);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGroups();
  }, []);

  console.log(userGroups)

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavigation />
      </div>
      <div className="w-3/4 px-16 py-12 bg-smokewhite">
        <div>
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-5xl font-bold">Groups</h2>
            <Link to="/creategroup">
              <button className="bg-light-green text-bg-black py-3 px-6 rounded">
                + Create
              </button>
            </Link>
          </div>
        </div>

        <div className="p-6 overflow-scroll h-3/5">
          {userGroups.length > 0 ? (
            <div className="p-2 overflow-y-scroll">
                {userGroups.map((groupName) => (
                  <div key={groupName} className="mb-4 p-6 bg-white">
                    <span className="font-medium text-2xl">{groupName}</span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-xl font-bold mb-4 text-red-500">
              No groups found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Groups;
