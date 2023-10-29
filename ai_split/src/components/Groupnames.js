import React from "react";




function Groupnames({ name,image, amount }) {
  const color = amount.includes("You owe") ? " text-green-500" : " text-red"

  return(
    
    <div className="mb-4 flex items-center space-x-4">
      <img className="w-20 h-20 rounded-full ml-4" src={image} alt={name}/>
      
      <div className="flex-grow">{name}</div>
      <span></span>
      <div className={color}>{amount}</div>
    </div>
  );
}

export default Groupnames;