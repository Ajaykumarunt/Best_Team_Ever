import React from 'react'

const GroupActivityContent = ({payload}) => {
  return (
    <div className='p-4 mb-4 border-black border-b-2'>
      {payload.action === "add" ? <p>You are to added to <span className='font-semibold'>{payload.groupName}</span></p> : <p>You are removed from the <span className='font-semibold'>{payload.groupName}</span></p>}
    </div>
  )
}

export default GroupActivityContent