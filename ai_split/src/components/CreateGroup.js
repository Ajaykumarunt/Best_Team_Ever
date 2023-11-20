import { React, useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import SideNavigation from "./SideNavigation";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";

const CreateGroup = () => {
  const { currentUserId, currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [groupTitle, setgroupTitle] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState("");
  const [displayedResults, setDisplayedResults] = useState([]);
  const [displayedEmails, setDisplayedEmails] = useState([currentUser.email]);

  let currentUserFriends = currentUser.friends || [];

  function isFriend(friendEmail) {
    currentUserFriends.forEach((friend) => {
      if (friend.email === friendEmail) {
        return true;
      }
    });
  }

  function CreateButton() {
    if (groupTitle && displayedEmails.length > 0) {
      return (
        <button
          type="submit"
          className="mt-6 bg-light-green px-4 py-3 rounded-md"
          disabled={false}
          onClick={handleCreateGroup}
        >
          Create Group
        </button>
      );
    } else {
      return (
        <button
          type="submit"
          className="mt-6 bg-light-green px-4 py-3 rounded-md disabled:bg-gray-400"
          disabled={true}
          onClick={handleCreateGroup}
        >
          Create Group
        </button>
      );
    }
  }

  const handleSearch = () => {
    const usersRef = collection(db, "users");

    getDocs(query(usersRef, where("email", "==", email)))
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const results = [];
          querySnapshot.forEach((doc) => {
            results.push(doc.data().first_name + " " + doc.data().last_name);
          });
          setSearchResults(results);
          setMessage("");
        } else {
          setSearchResults([]);
          setMessage("No users found with this email.");
        }
      })
      .catch((error) => {
        console.error("Error searching for users:", error);
        setMessage("Error searching for users.");
      });
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;

    if (newEmail !== email || newEmail === "") {
      setSearchResults([]);
      setMessage("");
    }

    setEmail(newEmail);
  };

  const handleDisplayResult = (result, email) => {
    if (
      !displayedResults.includes(result) ||
      !displayedEmails.includes(email)
    ) {
      setDisplayedResults([...displayedResults, result]);
      setDisplayedEmails([...displayedEmails, email]);
    } else {
      setMessage("Member is already is added!");
    }
  };

  const handleDeleteResult = (index) => {
    console.log(index);
    const updatedResults = [...displayedResults];
    updatedResults.splice(index, 1);
    setDisplayedResults(updatedResults);

    const updatedEmails = [...displayedEmails];
    updatedEmails.splice(index + 1, 1);
    setDisplayedEmails(updatedEmails);
  };

  const handleCreateGroup = () => {
    if (groupTitle && displayedEmails.length > 0) {
      const newGroup = {
        groupName: groupTitle,
        members: displayedEmails,
      };

      addDoc(collection(db, "groups"), newGroup)
        .then((docRef) => {
          displayedEmails.forEach(async (email) => {
            const usersRef = collection(db, "users");
            getDocs(query(usersRef, where("email", "==", email))).then(
              (querySnapshot) => {
                if (!querySnapshot.empty) {
                  querySnapshot.forEach((doc) => {
                    getDoc(doc.ref).then(async (userDoc) => {
                      const userDocData = userDoc.data();
                      const friends = userDocData.friends || [];

                      const existingEmails = friends.map(
                        (friend) => friend.email
                      );

                      console.log(existingEmails)

                      const newEmails = displayedEmails.filter(
                        (firendEmail) => firendEmail !== email && !existingEmails.includes(firendEmail)
                      );

                      console.log(newEmails)

                      const updatedFriends = [
                        ...friends,
                        ...newEmails.map((firendEmail) => ({ email: firendEmail, balance: 0.0 })),
                      ];

                      console.log(updatedFriends)

                      await updateDoc(doc.ref, {
                        "groups.ids": arrayUnion(docRef.id),
                        activity: arrayUnion({
                          type: "group",
                          payload: {
                            action: "add",
                            groupName: groupTitle,
                            groupId: docRef.id,
                          },
                          timestamp: Timestamp.now(),
                        }),
                        friends: updatedFriends,
                      });
                    });
                  });
                } else {
                  console.log("no user with emial");
                }
              }
            );
          });
          setEmail("");
          setgroupTitle("");
          setDisplayedResults([]);
          setDisplayedEmails([]);
        })
        .catch((error) => {
          console.error("Error creating group:", error);
        });
    }
  };

  useEffect(() => {
    console.log(displayedEmails);
  }, [displayedEmails]);

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavigation />
      </div>
      <div className="w-3/4 px-12 py-16 bg-smokewhite">
        <input
          type="text"
          value={groupTitle}
          onChange={(e) => setgroupTitle(e.target.value)}
          placeholder="Group Title"
          className="w-3/4 px-4 py-2 rounded-md shadow-md mb-4 border-bg-black border-2"
        />
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="Search users..."
          className="w-3/4 px-4 py-2 rounded-md shadow-md border-bg-black border-2"
        />
        <button
          className="mt-4 bg-bg-black text-white px-4 py-2 rounded-md ml-3"
          onClick={handleSearch}
        >
          Search
        </button>

        <div className="mb-6">
          {searchResults.map((name, index) => (
            <div
              key={index}
              className="bg-white w-3/4 p-4 text-bg-black font-semibold text-xl rounded-md"
            >
              <button onClick={() => handleDisplayResult(name, email)}>
                {name}
              </button>
            </div>
          ))}
          {message && (
            <div className="bg-white w-3/4 p-6 rounded-md">
              <p className="text-bg-black font-semibold text-xl ">{message}</p>
            </div>
          )}
        </div>

        {displayedResults.length > 0 && (
          <div className="bg-white w-3/4 h-3/5 rounded-md py-8 px-12 overflow-hidden">
            {/* <h1 className="text-2xl text-bg-black font-semibold mb-8">Members</h1> */}
            {displayedResults.map((result, index) => (
              <div key={index} className="p-4 mb-4">
                <div className="flex items-center justify-between overflow-y-scroll">
                  <span className="text-2xl font-medium text-bg-black">
                    {result}
                  </span>
                  <button
                    className="bg-red px-6 py-2 rounded-md text-smokewhite"
                    onClick={() => handleDeleteResult(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <CreateButton />
      </div>
    </div>
  );
};

export default CreateGroup;
