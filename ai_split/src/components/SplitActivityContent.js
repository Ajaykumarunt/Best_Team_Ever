import React from 'react'

const SplitActivityContent = ({payload}) => {
  return (
    <div className='p-4 mb-4 bg-white rounded-md'>
      {<p><span className='font-semibold'>{payload.payer_name}</span> added <span className='font-semibold'>{payload.expense_title}</span> expense in <span className='font-semibold'>{payload.group_name}</span> group</p>}
    </div>
  )
}

export default SplitActivityContent