import { React, useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SideNavigation from "./SideNavigation";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  arrayUnion,
  Timestamp
} from "firebase/firestore";
import { IoArrowBack } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";

const ManualSplit = () => {
  const [expenseTitle, setExpenseTitle] = useState("");
  const [groupNames, setGroupNames] = useState([]);
  const [groupsMembers, setGroupsMembers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [payer, setpayer] = useState("");
  const { currentUserId, currentUser } = useContext(AuthContext);
  const [showNextForm, setShowNextForm] = useState(false);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showEditProductForm, setShowEditProductForm] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [editProductIndex, setEditProductIndex] = useState(null);
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    setShowAddProductForm(true);
  };

  const handleBackButtonClick = () => {
    setShowNextForm(false);
  };

  const handleDoneButtonClick = () => {
    if (productName && productPrice) {
      let membersInvolved = [];
      groupsMembers.map((mem) => {
        membersInvolved.push(mem.first_name + " " + mem.last_name);
      });
      setProducts([
        ...products,
        {
          product_title: productName,
          product_price: productPrice,
          membersInvolved: membersInvolved,
          expanded: true,
        },
      ]);

      setProductName("");
      setProductPrice("");

      setShowAddProductForm(false);
    }
  };

  const handleEditProduct = () => {
    if (productName && productPrice) {
      let updatedProducts = [...products];
      updatedProducts[editProductIndex].product_title = productName;
      updatedProducts[editProductIndex].product_price = productPrice;

      setProductName("");
      setProductPrice("");

      setShowEditProductForm(false);
    }
  };

  const handleModalClose = (type) => {
    type === "add"
      ? setShowAddProductForm(false)
      : setShowEditProductForm(false);
    setProductName("");
    setProductPrice("");
  };

  const handleExpandClick = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].expanded = !updatedProducts[index].expanded;
    setProducts(updatedProducts);
  };

  const handleCheckboxChange = (productIndex, member) => {
    let updatedProducts = [...products];
    let updatedMembersList = updatedProducts[productIndex].membersInvolved;

    if (updatedMembersList.includes(member)) {
      updatedMembersList = updatedMembersList.filter((ele) => ele !== member);
    } else {
      updatedMembersList.push(member);
    }

    updatedProducts[productIndex].membersInvolved = updatedMembersList;
    setProducts(updatedProducts);
  };

  const handleDeleteButtonClick = (index) => {
    let updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleEditButtonClick = (index) => {
    setEditProductIndex(index);
    setProductName(products[index].product_title);
    setProductPrice(products[index].product_price);
    setShowEditProductForm(true);
  };

  useEffect(() => {
    const getGroupNames = async () => {
      const names = await Promise.all(
        currentUser.groups.ids.map(async (groupId) => {
          const groupDoc = doc(db, "groups", groupId);
          const groupSnap = await getDoc(groupDoc);

          if (groupSnap.exists()) {
            return groupSnap.data().groupName;
          } else {
            console.log("No such document!");
            return null;
          }
        })
      );
      const filteredNames = names.filter((name) => name !== null);

      setGroupNames(filteredNames);
    };

    getGroupNames();
  }, [currentUser]);

  useEffect(() => {
    const getGroupMembers = async () => {
      const q = query(
        collection(db, "groups"),
        where("groupName", "==", selectedGroup)
      );

      const querySnapshot = await getDocs(q);
      let memNames = [];

      await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const memberNames = await Promise.all(
            doc.data().members.map(async (memberEmail) => {
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
        })
      );

      setGroupsMembers(memNames);
    };

    getGroupMembers();
  }, [selectedGroup]);

  async function addExpenseToDB() {
    let total_amount = 0.0;

    const userShares = [];

    products.forEach((product) => {
      const { product_price, membersInvolved } = product;
      total_amount += parseFloat(product_price);
      const share = product_price / membersInvolved.length;

      membersInvolved.forEach((member) => {
        let member_email = "";
        groupsMembers.forEach((grpmemeber) => {
          if (grpmemeber.first_name + " " + grpmemeber.last_name === member) {
            member_email = grpmemeber.email;
          }
        });
        const existingUser = userShares.find(
          (user) => user.user_name === member
        );

        if (existingUser) {
          existingUser.split_amount += share;
        } else {
          userShares.push({
            user_name: member,
            user_email: member_email,
            split_amount: parseFloat(share.toFixed(2)),
          });
        }
      });
    });

    let payer_email = "";
    groupsMembers.forEach((memeber) => {
      if (memeber.first_name + " " + memeber.last_name === payer) {
        payer_email = memeber.email;
      }
    });

    let expenseData = {
      title: expenseTitle,
      group: selectedGroup,
      payer_name: payer,
      payer_email: payer_email,
      total_amount: total_amount,
      products: [...products],
      user_shares: userShares,
    };

    addDoc(collection(db, "Product_Expense"), expenseData)
      .then(async (docRef) => {
        const q = query(
          collection(db, "users"),
          where("email", "==", payer_email)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (usrdoc) => {
          const friends = usrdoc.data().friends;
          const updatedFriends = friends.map((friend) => {
            const usr = userShares.find(
              (usr) => friend.email === usr.user_email
            );

            if (usr) {
              let updated_balance = friend.balance + usr.split_amount;
              let updatedFriend = {
                email: friend.email,
                balance: parseFloat(updated_balance.toFixed(2)),
              };
              return updatedFriend;
            } else {
              return friend;
            }
          });

          const usrRef = doc(db, "users", usrdoc.id);

          await updateDoc(usrRef, {
            friends: updatedFriends,
          });
        });

        //Update friends field for non-payer members
        userShares.map(async (usr) => {
          if (usr.user_email !== payer_email) {
            const q = query(
              collection(db, "users"),
              where("email", "==", usr.user_email)
            );

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(async (usrdoc) => {
              const friends = usrdoc.data().friends;
              const updatedFriends = friends.map((friend) => {
                if (friend.email === payer_email) {
                  let updated_balance = friend.balance - usr.split_amount;
                  let updatedFriend = {
                    email: friend.email,
                    balance: parseFloat(updated_balance.toFixed(2)),
                  };
                  return updatedFriend;
                } else {
                  return friend;
                }
              });

              console.log(updatedFriends);

              const usrRef = doc(db, "users", usrdoc.id);

              await updateDoc(usrRef, {
                friends: updatedFriends,
              });
            });
          }
        });

        //Adding activity for the expense
        userShares.forEach(async (usr) => {
          const usersRef = collection(db, "users");
          const querySnapshot = await getDocs(query(usersRef, where("email", "==", usr.user_email)));
        
          if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
              await updateDoc(doc.ref, {
                activity: arrayUnion({
                  type: "split add",
                  payload: {
                    expense_id: docRef.id,
                    expense_title: expenseTitle,
                    expense_total: total_amount,
                    group_name: selectedGroup,
                    payer_name: payer,
                  },
                  timestamp: Timestamp.now(),
                }),
              });
            });
          }
        });

        setExpenseTitle("");
        setGroupNames([]);
        setGroupsMembers([]);
        setSelectedGroup("");
        setpayer("");
        setProducts([]);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavigation />
      </div>
      <div className="w-3/4 p-12 bg-smokewhite">
        <h1 className="text-4xl font-semibold text-bg-black">Add Expense</h1>
        <div className="flex flex-col items-center h-screen mt-8">
          {showNextForm ? (
            <div className="w-full h-screen">
              <div className="back_button w-full flex justify-between items-center mb-4">
                <button className="text-3xl" aria-label={"back button"} onClick={handleBackButtonClick}>
                  <IoArrowBack />
                </button>
                <div className="flex gap-6">
                  <button
                    className="py-2 px-3 bg-bg-black text-smokewhite text-sm rounded-md"
                    onClick={handleAddProductClick}
                  >
                    Add Product
                  </button>
                  <button
                    className="py-2 px-3 bg-light-green text-bg-black text-sm rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                    onClick={addExpenseToDB}
                    disabled={products.length === 0}
                  >
                    Done
                  </button>
                </div>
              </div>
              <div className="products h-3/4 w-full overflow-y-scroll">
                {products.map((product, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center justify-between px-8 bg-white rounded-t-lg">
                      <div className="py-4">
                        <p className="text-xl font-semibold">
                          {product.product_title} - $ {product.product_price}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          className="text-2xl"
                          ariaLabel="Expand/Collapse"
                          onClick={() => handleExpandClick(index)}
                        >
                          {product.expanded ? (
                            <IoIosArrowDropup />
                          ) : (
                            <IoIosArrowDropdown/>
                          )}
                        </button>

                        <button
                          className="text-2xl product_edit_btn"
                          aria-label="Edit Product"
                          onClick={() => handleEditButtonClick(index)}
                        >
                          <FaRegEdit />
                        </button>

                        <button
                          className="text-2xl product_delete_btn"
                          aria-label={"Delete product"}
                          value="delete product"
                          onClick={() => handleDeleteButtonClick(index)}
                        >
                          <IoTrashOutline />
                        </button>
                      </div>
                    </div>
                    {product.expanded && (
                      <div className="px-8 py-2 bg-gray-200 rounded-b-md">
                        {groupsMembers.map((member, memberIndex) => (
                          <div
                            key={memberIndex}
                            className="flex items-center p-2"
                          >
                            <input
                              type="checkbox"
                              id={`member-${memberIndex}`}
                              checked={product.membersInvolved.includes(
                                member.first_name + " " + member.last_name
                              )}
                              onChange={() =>
                                handleCheckboxChange(
                                  index,
                                  member.first_name + " " + member.last_name
                                )
                              }
                              className=""
                            />
                            <label
                              htmlFor={`member-${memberIndex}`}
                              className="flex items-center cursor-pointer space-x-2 text-lg font-medium"
                            >
                              {member.first_name + " " + member.last_name}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col w-1/2 rounded-lg gap-12 mt-20">
                <input
                  type="text"
                  placeholder="Expense title"
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  className="p-2 border-bg-black border-2 rounded-lg"
                />
                <select
                  id="groupDropdown"
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="p-2 border-bg-black border-2 rounded-lg"
                >
                  <option value="">Select a group</option>
                  {groupNames.map((groupName, index) => (
                    <option key={index} value={groupName}>
                      {groupName}
                    </option>
                  ))}
                </select>
                <select
                  id="payerDropDown"
                  value={payer}
                  onChange={(e) => setpayer(e.target.value)}
                  className="p-2 border-bg-black border-2 rounded-lg"
                >
                  <option value="">Select a member</option>
                  {groupsMembers.map((groupsMember, index) => (
                    <option
                      key={index}
                      value={
                        groupsMember.first_name + " " + groupsMember.last_name
                      }
                    >
                      {groupsMember.first_name + " " + groupsMember.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end w-1/2">
                <button
                  onClick={() => setShowNextForm(true)}
                  className="py-3 px-8 bg-light-green rounded-md mt-16"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {showAddProductForm && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  onClick={handleModalClose}
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                <div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="w-full">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <div className="flex flex-col gap-3">
                          <input
                            type="text"
                            placeholder="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="p-2 border-bg-black border-2 rounded-lg mt-3"
                          />
                          <input
                            type="text"
                            placeholder="Product Price"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="p-2 border-bg-black border-2 rounded-lg mt-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      aria-label="Edit Product"
                      onClick={handleDoneButtonClick}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-light-green text-base font-medium text-bg-black hover:bg-light-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-green-dark sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => handleModalClose("add")}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-green-dark sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showEditProductForm && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  onClick={() => handleModalClose("edit")}
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                <div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="w-full">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <div className="flex flex-col gap-3">
                          <input
                            type="text"
                            placeholder="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="p-2 border-bg-black border-2 rounded-lg mt-3"
                          />
                          <input
                            type="text"
                            placeholder="Product Price"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="p-2 border-bg-black border-2 rounded-lg mt-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      aria-label="Edit Product"
                      onClick={handleEditProduct}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-light-green text-base font-medium text-bg-black hover:bg-light-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-green-dark sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      aria-label="Cancel button"
                      onClick={handleModalClose}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-green-dark sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManualSplit;
