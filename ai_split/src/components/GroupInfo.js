import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideNavigation from "./SideNavigation";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  arrayUnion,
  updateDoc,
  Timestamp
} from "firebase/firestore";
import { IoTrashOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import Avatar, { genConfig } from "react-nice-avatar";

const GroupInfo = () => {
  const { id } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [groupMembers, setGroupsMembers] = useState([]);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [message, setMessage] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchedUser, setsearchedUser] = useState({});

  console.log(id);

  useEffect(() => {
    const fetchGroupData = async () => {
      const groupDocRef = doc(db, "groups", id);
      const groupDocSnap = await getDoc(groupDocRef);
      setGroupData(groupDocSnap.data());
    };

    fetchGroupData();
  }, [id]);

  const handleSearch = () => {
    const usersRef = collection(db, "users");

    getDocs(query(usersRef, where("email", "==", searchEmail)))
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const results = { email: "", name: "" };
          querySnapshot.forEach((doc) => {
            results.email = doc.data().email;
            results.name = doc.data().first_name + " " + doc.data().last_name;
          });
          setsearchedUser(results);
          setMessage("");
        } else {
          setsearchedUser([]);
          setMessage("No users found with this email.");
        }
      })
      .catch((error) => {
        console.error("Error searching for users:", error);
        setMessage("Error searching for users.");
      });
  };

  const handleAddNewMember = async (newUserEmail) => {
    const groupDocRef = doc(db, "groups", id);
    await updateDoc(groupDocRef, {
      members: arrayUnion(newUserEmail),
    });

    const usersRef = collection(db, "users");
    const qry = query(usersRef, where("email", "==", newUserEmail));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach(async (doc) => {
      const updatedFriends = groupData.members.map((email) => ({
        email,
        balance: 0
      }));
      await updateDoc(doc.ref, {
        groups: arrayUnion(id),
        activity: arrayUnion({
          type: "group",
          payload: {
            action: "add",
            groupName: groupData.groupName,
            groupId: id,
          },
          timestamp: Timestamp.now(),
        }),
        friends: arrayUnion(...updatedFriends),
      });
    });

    for (const email of groupData.members) {
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('email', '==', email))
      const qShot = await getDocs(q)

      qShot.forEach(async(doc)=>{
        const userDocData = doc.data();
        if (userDocData && userDocData.friends) {
          if (
            !userDocData.friends.find((friend) => friend.email === newUserEmail)
          ) {
            const updatedFriends = [
              ...(userDocData.friends || []),
              { email: newUserEmail, balance: 0 },
            ];
            await updateDoc(doc.ref, { friends: updatedFriends });
          }
        } else {
          console.error(`Invalid user data for email: ${email}`);
        }
      })
    }

    setShowAddMemberModal(false)
    setsearchedUser('')
    setMessage('')
  };

  useEffect(() => {
    const fetchGroupMemberNames = async () => {
      if (groupData && groupData.members) {
        let memNames = [];

        const memberNames = await Promise.all(
          groupData.members.map(async (memberEmail) => {
            const usrq = query(
              collection(db, "users"),
              where("email", "==", memberEmail)
            );

            const usrquerySnapshot = await getDocs(usrq);

            if (!usrquerySnapshot.empty) {
              const usrdoc = usrquerySnapshot.docs[0];
              return usrdoc.data();
            } else {
              console.log(`No user found with email: ${memberEmail}`);
              return null;
            }
          })
        );

        memNames = memNames.concat(memberNames);

        setGroupsMembers(memNames);
      }
    };
    fetchGroupMemberNames();
  }, [groupData]);

  console.log(groupMembers);

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavigation />
      </div>
      <div className="w-3/4 bg-smokewhite">
        <div className="w-full h-2/5 flex justify-center items-center">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-4xl font-semibold">
              {groupData && groupData.groupName}
            </h1>
            <div className="flex gap-4">
              <button
                className="px-5 py-2 bg-light-green text-bg-black rounded-md"
                onClick={() => setShowAddMemberModal(true)}
              >
                Add Member
              </button>
              <button className="px-5 py-2 bg-bg-black text-smokewhite rounded-md">
                Edit
              </button>
              <button className="px-5 py-2 bg-red text-smokewhite rounded-md">
                Delete Group
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-1/2 flex flex-col justify-center items-center pb-10">
          <div className="bg-white w-3/4 h-full py-10 px-16 rounded-md overflow-y-auto">
            {groupMembers.map((member) => (
              <div
                key={member.email}
                className="flex justify-between items-center mb-8"
              >
                <div className="flex gap-6 items-center">
                  {member.profile_img_url ? (
                    <img
                      src={member.profile_img_url}
                      alt="User Profile Image"
                      className="w-12 h-12 rounded-full cursor-pointer"
                    />
                  ) : (
                    <Avatar
                      className="w-12 h-12 cursor-pointer"
                      {...genConfig(member.email)}
                    />
                  )}
                  <h1 className="text-xl font-semibold text-bg-black capitalize">
                    {member.first_name + " " + member.last_name}
                  </h1>
                </div>
                <IoTrashOutline className="text-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddMemberModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={() => setShowAddMemberModal(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div
              className="inline-block h- align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="w-full">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-center gap-4 w-full">
                        <input
                          type="text"
                          placeholder="Search with email"
                          value={searchEmail}
                          onChange={(e) => setSearchEmail(e.target.value)}
                          className="p-2 border-bg-black border-2 rounded-lg w-4/5"
                        />
                        <FiSearch className="text-3xl" onClick={handleSearch} />
                      </div>
                      <div className="mb-6 px-4">
                        {searchedUser!='' && (
                          <div className="bg-gray-200 p-4 text-bg-black font-semibold text-xl rounded-md">
                            <button
                              onClick={() =>
                                handleAddNewMember(searchedUser.email)
                              }
                            >
                              {searchedUser.name}
                            </button>
                          </div>
                        )}
                        {message && (
                          <div className="bg-white w-3/4 p-6 rounded-md">
                            <p className="text-bg-black font-semibold text-xl ">
                              {message}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupInfo;
