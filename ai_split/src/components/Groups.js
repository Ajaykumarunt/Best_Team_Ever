import React, { useState, useContext, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import SideNavigation from "./SideNavigation";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";


//import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../firebase.js";

function Groups() {
  const { setcurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userNames, setUsersNames] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState({});
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [CheckedEmails, setCheckedEmails] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  //const userId = "xtSTRqzIHRcqxq4UQIeZIrpojA22";
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  // const handleSelectedEmails = (selected) => {
  //   const emails = Object.keys(selected).filter((email) => selected[email]);
  //   //console.log(`these are selected emails : ${selected}`);
  //   setCheckedEmails(emails);
  //   //console.log(`these are selected emails : ${checkedEmails}`);
  // };

  

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => doc.data().email);
      setUsersNames(userList);
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (name) => {
    setSelectedUsers((prev) => ({ ...prev, [name]: !prev[name] }));
    // const emails = Object.keys(name).filter((email) => name[email]);
    // setCheckedEmails(emails);
    // console.log(CheckedEmails);
  };

  const filteredNames = userNames.filter(
    (name) =>
      searchValue && name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavigation />
      </div>
      <div className="w-3/4 p-8">
        <div >
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Groups</h2>
            <button
              className="bg-green-500 text-white px-5 py-5 rounded"
              onClick={() => setShowSearchBox(!showSearchBox)}
            >
              + Create
            </button>
          </div>

          {showSearchBox && (
            <div className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search users..."
                className="w-full px-4 py-2 rounded border shadow-md mb-4"
              />
              {filteredNames.length > 0 && (
                <div className="absolute top-full w-full max-h-64 overflow-y-auto border">
                  <ul>
                    {filteredNames.map((name) => (
                      <li key={name} className="flex items-center">
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
              )}
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={async () => {

                  // Continue here to write data to firebase. selectedUsers variable contains email id.
                  const db = getFirestore(app);
                  const usersCollection = collection(db, "users");
                  
                  let userIds = [];
                  for (let email of Object.keys(selectedUsers)) {
                      const q = query(usersCollection, where("email", "==", email));
                      
                      const querySnapshot = await getDocs(q);
                      querySnapshot.forEach((doc) => {
                          userIds.push(doc.id); // assuming the document ID is the user ID
                        });
                  }
              
                  setSelectedUserIds(userIds);
                  console.log("User IDs:", userIds);
                }}
              >
                Submit
              </button>
            </div>
          )}

          {CheckedEmails.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Selected Emails:</h3>
              <ul className="bg-gray-100 p-4 rounded shadow-md">
                {CheckedEmails.map((email) => (
                  <li key={email} className="border-b py-2">
                    {email}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="p-6">
          {userGroups.length > 0 ? (
            <>
              <h1 className="text-2xl mb-4">Groups the user is a member of:</h1>
              <ul className="list-disc pl-5">
                {userGroups.map((groupName) => (
                  <li key={groupName} className="mb-2">
                    {groupName}
                  </li>
                ))}
              </ul>
            </>
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
