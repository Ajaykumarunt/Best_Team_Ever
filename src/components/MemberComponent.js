//import React from 'react'
import Member_1 from "../member1.png";
import Member_2 from "../member2.png";
import Member_3 from "../member3.png";

const members = ["Member_1"];
const mempic = [Member_1, Member_2, Member_3];
const MemberComponent = ({ name, amount }) => {
  return mempic.map((mempic) => (
    <div className="Mem">
      <img src={mempic} alt="Icon" className="mempic" />
      <p>{members}</p>
      <p>You owe $23.43</p>
    </div>
  ));
};

export default MemberComponent;
