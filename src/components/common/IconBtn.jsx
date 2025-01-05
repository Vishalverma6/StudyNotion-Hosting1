import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline=false,
    customClasses="",
    type,
    clas
}) => {
  return (
    <button 
    className={` ${outline ? "border border-yellow-50 bg-transparent": "bg-yellow-50"} cursor-pointer font-semibold text-richblack-900 py-[6px] px-3 rounded-md flex gap-2 items-center
        ${customClasses}
        `}
    disabled={disabled}
    onClick={onclick}
    
    type={type}
    >
        {
            children ? (
                <>  
                   <span className={`${outline && "text-yellow-50"}`}>
                       {text}
                    </span> 
                    {children} 
                 </>
            ): (text)
        }
    </button>
  )
}

export default IconBtn
