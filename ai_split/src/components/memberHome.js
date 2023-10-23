import React from 'react'
import Member_1 from '../member1.png';
import Member_2 from '../member2.png';
import Member_3 from '../member3.png';


const members = ["Member_1"];
const mempic = [Member_1, Member_2, Member_3];

const memberHome = () => {
    return mempic.map(mempic => (
         <div className=" mb-4 flex items-center space-x-8">
            < img className ="w-20 h-20 rounded-full ml-4" src={mempic} alt={members}  />
            
            <div  className =" text-2xl font-italic flex-grow ">{members}</div>
            <span></span>
            <p>You owe $23.43</p>
        </div>
    ));
}

export default memberHome