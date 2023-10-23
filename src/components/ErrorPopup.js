import React from 'react'

const ErrorPopup = ({message}) => {
  return (
    <div className="error_popup_wrapper absolute px-2 py-4 left-1/2 translate-x-[-50%]">
        <div className="error-popup bg-red w-96 text-smokewhite p-3 rounded-md text-center">
          {message}
        </div>
      </div>
  )
}

export default ErrorPopup