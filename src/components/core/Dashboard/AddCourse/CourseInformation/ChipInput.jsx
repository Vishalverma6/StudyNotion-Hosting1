import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';

const ChipInput = ({label,name,register,placeholder,errors,setValue,getValues }) => {



  const {editCourse, course} = useSelector((state)=> state.course)
  const [chips,setChips]= useState([]);

  useEffect(()=> {
    if(editCourse){
      setChips(course?.tag)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    
  },[])

 

  useEffect(()=> {
    setValue(name, chips)
  },[chips])
  // function to handle chip when user provide input and press enter
  const handleKeyDown =(event) => {
    // Check if user press "Enter " or ","
    if(event.key=== "Enter" || event.key === ","){
      event.preventDefault();
      // Get the input value and remove any leading/trailing spaces
      const chipValue = event.target.value.trim()
      // Check if the input value exixt and is not already in the chips array
      if(chipValue && !chips.includes(chipValue)){
        const newChips = [...chips,chipValue]
        setChips(newChips)
        event.target.value = ""
      }
    }
      


  }

  // function to handle deletion of a chip
  const handleDeleteChip =(chipIndex)=> {
    // Filter the chips array to remove the chip with the given Index
    const newChips = chips.filter((_, index) => index !== chipIndex)
    setChips(newChips)
  }


  return (
    <div className='flex flex-col  space-y-2 text-richblack-5'>
      {/* for label */}
       <label className='text-sm text-richblack-5'
        htmlFor={name}>{label} <sup className='text-red-500'>*</sup>
        </label>

        {/* Render the Chips and input */}
        <div className='flex flex-col flex-wrap gap-y-1'>
            <div className='flex flex-wrap'>

            {
              chips.map((chip,index) => (
                <div key={index}
                   className='m-1 flex items-center rounded-lg bg-yellow-400
                   px-2 py-1 text-sm text-richblack-5'
                >
                   {chip}

                   {/* delete button icon */}
                   <button type='button'
                    className='ml-2 focus:outline-none border rounded-md bg-richblack-700 border-richblack-800'
                    onClick={()=> handleDeleteChip(index)}
                   >
                        <MdClose className='text-sm'/>
                   </button>
                </div>
              ))
            }

              
            </div>
            <input
            type='text'
            name={name}
            id={name}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className='form-style w-full flex'
          />
        </div>

       {
        errors[name] &&(
          <span className='ml-2 text-xs tracking-wide text-pink-200'>
             {label} is required**
          </span>
        )
       }
    </div>
    
  )
}

export default ChipInput
