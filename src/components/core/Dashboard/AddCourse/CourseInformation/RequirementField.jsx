import React, { useEffect, useState } from 'react'
import { MdCancel } from 'react-icons/md';

const RequirementField = ({name,label,register,errors,setValue,getValues}) => {

    const [requirement, setRequirement]= useState("");
    const [requirementList, setRequirementList]= useState([]);


    useEffect( ()=> {
        register(name, {
            required:true,
            validate: (value) => value.length >0
        })
    },[])

    useEffect( ()=> {
        setValue(name, requirementList)
    },[requirementList])

    const handleAddRequirement= ()=> {
        if(requirement){
            setRequirementList([...requirementList,requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList= [...requirementList]
        updatedRequirementList.splice(index,1);
        setRequirementList(updatedRequirementList);
    }
  return (
    <div className='flex flex-col gap-2'>
       <label className="text-sm text-richblack-5" htmlFor={name}>{label}<sup className='text-red-500'>*</sup></label>
       <div className='flex flex-col items-start gap-1'>
          <input
             type='text'
             id={name}
             value={requirement}
             onChange={(event)=> setRequirement(event.target.value)}
             className='w-full form-style'
          />
          <button
            type='button'
            onClick={handleAddRequirement}
            className='font-semibold text-yellow-50 text-[12px]'
          >
              Add
          </button>
          
       </div>

       {
          requirementList.length > 0 && (
            <ul className='mt-2 list-disc list-inside' >
                {
                    requirementList.map((requirement,index)=> (
                        <li key={index}
                          className='flex items-center text-richblack-5'
                        >
                            <span>{requirement}</span>

                            <button
                              type='button'
                              onClick={()=> handleRemoveRequirement(index)}
                              className=' flex items-center text-xs text-pure-greys-300 ml-1 text-center'
                            >
                                Clear
                                <MdCancel />
                            </button>
                        </li>
                    ))
                }
            </ul>
         )
        }
        {errors[name] && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                {label} is required **
            </span>
        )}
    </div>
  )
}

export default RequirementField