import { React, useState, useEffect, useContext } from "react";
import SideNavigation from "./SideNavigation";
import { db } from "../firebase.js";
import { AuthContext } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import GroupActivityContent from "./GroupActivityContent";
import SplitActivityContent from "./SplitActivityContent";

const Activity = () => {
  const [activity, setactivity] = useState([]);
  const [loading, setloading] = useState(false);

  const { currentUserId } = useContext(AuthContext);

  useEffect(() => {
    const fetchActivity = async () => {
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
          if (userData && userData.activity) {
            setactivity(userData.activity);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setloading(false);
        }
      }
    };

    fetchActivity();
  }, []);
  console.log(activity);
  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavigation />
      </div>
      <div className="w-3/4 bg-smokewhite px-16 py-12">
        <h1 className="text-5xl font-bold mb-12">Activity</h1>

        <div className="h-5/6">
          <div className="bg-smokewhite px-10 py-6 rounded-lg mt-8 h-90 w-full overflow-scroll">
            {loading ? (
              <p className="flex justify-center items-center h-full">
                Loading...
              </p>
            ) : activity && activity.length === 0 ? (
              <p className="text-2xl h-full flex justify-center items-center">
                No Activity to display
              </p>
            ) : (
              activity.map((ele) =>
                ele.type === "group" ? (
                  <GroupActivityContent payload={ele.payload} />
                ) : (
                  <SplitActivityContent />
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
