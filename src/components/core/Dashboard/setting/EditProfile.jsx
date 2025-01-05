import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../../services/operations/settingsApi';




const genders= ["Select", "Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

const EditProfile = () => {


    

    const navigate= useNavigate();
    const dispatch= useDispatch();
    const {token}= useSelector((state)=> state.auth)
    const { user } = useSelector((state) => state.profile)

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();


    
    const submitProfileForm =async(data) => {
        try{
            dispatch(updateProfile(token,data))
           
        }catch(error){
            console.log("ERROR MESSAGE_ ",error.message)
        }
    }    

   

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>

        {/* profile Information */}
        <div className='w-9/12 flex flex-col gap-y-6 rounded-md bg-richblack-800 border-[1px] border-richblack-700 px-10 p-7'>
            <h2 className="text-lg font-semibold text-richblack-5">
                Profile Information
            </h2>

            {/* first name and last name  */}
            <div className='flex flex-col gap-5 lg:flex-row'>
                {/* first name  */}
                <div className='flex flex-col gap-2 lg:w-[48%] '>
                    <label htmlFor='firstName'
                    className='label-style'>
                        First Name
                    </label>
                    <input
                      type='text'
                      name='firstName'
                      id='firstName'
                      placeholder='Enter first name'
                      className='form-style '
                      {...register("firstName",{required:true})}
                      defaultValue={user?.firstName}
                    />

                    {errors.firstName && (
                        <span className='-mt-1 text-[12px] text-yellow-100'>
                            Please enter your first name
                        </span>
                    )}
                </div>

                {/* last name */}
                <div  className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor='lastName'
                    className='label-style'>
                        Last Name
                    </label>
                    <input
                      type='text'
                      name='lastName'
                      id='lastName'
                      placeholder='Enter last name'
                      className='form-style '
                      {...register("lastName",)}
                      defaultValue={user?.lastName}
                    />

                    {/* {errors.firstName && (
                        <span className='-mt-1 text-[12px] text-yellow-100'>
                            Please enter your first name
                        </span>
                    )} */}

                </div>
            </div>

            {/* Date of Birth And gender */}
            <div className='flex flex-col gap-5 lg:flex-row'>
                {/* for date of birth */}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="dateOfBirth" className="lable-style">
                        Date of Birth
                    </label>
                    <input
                     type='date'
                     name='dateOfBirth'
                     id='dateOfBirth'
                     className='form-style cursor-pointer'
                     {...register("dateOfBirth",{
                        required: {
                            value:true,
                            message:"Please enter your Date of Birth .",
                        },
                        max:{
                            value: new Date().toISOString().split("T")[0],
                            message: "date of Birth cannot be in future",
                        },
                     })}
                     defaultValue={user?.additionalDetails?.dateOfBirth}
                    />
                    {
                        errors.dateOfBirth && (
                            <span className='-mt-1 text-[12px] text-yellow-50'>
                                {errors.dateOfBirth.message}
                            </span>
                        )
                    }
                </div>

                {/* For Gender */}
                <div className='flex flex-col gap-2 lg:w-[48%]' >
                    <label htmlFor="gender" className="lable-style">
                        Gender
                    </label>
                    <select
                        type='text'
                        name='gender'
                        id='gender'
                        className='form-style'
                        {...register("gender",{required: true })}
                        defaultValue={user?.additionalDetails?.gender}
                    >
                        {
                            genders.map((ele,index) => {
                                return (
                                    <option key={index} value={ele}>
                                        {ele}
                                    </option>
                                )
                            })
                        }
                    </select>
                    {
                        errors.gender && (
                            <span className='-mt-1 text-[12px] text-yellow-50'>
                                Please select Your Gender
                            </span>
                        )
                    }
                </div>
            </div>

            {/* Contact Number and About */}
            <div className='flex flex-col gap-5 lg:flex-row'>
                {/* contact number */}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="contactNumber" className="lable-style">
                      Contact Number
                    </label>
                    <input
                     type='tel'
                     name='contactNumber'
                     id='contactNumber'
                     className='form-style'
                     placeholder='Enter Contact Number'
                     {...register("contactNumber",{
                        required: {
                            value:true,
                            message:"Please enter your Contact Number .",
                        },
                        maxLength: {value: 12, message: "Invalid Contact Number"},
                        minLength: {value: 10, message: "Invalid Contact Number"},
                     })}
                     defaultValue={user?.additionalDetails?.contactNumber}
                    />
                    {
                        errors.contactNumber && (
                            <span className='-mt-1 text-[12px] text-yellow-50'>
                                {errors.contactNumber.message}
                            </span>
                        )
                    }
                </div>

                {/* About */}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="about" className="lable-style">
                        About
                    </label>
                    <input
                     type='text'
                     name='about'
                     id='about'
                     className='form-style'
                     placeholder='Enter Bio details'
                     {...register("about",{
                        required: {
                            value:true,
                            message:"Please enter your About .",
                        },
                     })}
                     defaultValue={user?.additionalDetails?.about}
                    />
                    {
                        errors.about && (
                            <span className='-mt-1 text-[12px] text-yellow-50'>
                                {errors.about.message}
                            </span>
                        )
                    }
                </div>
            </div>
        </div>

        <div className='flex gap-2 justify-end w-9/12 mt-6'>
            <button 
            onClick={()=> {
                navigate("/dashboard/my-profile")
            }}
            className='bg-richblack-700 rounded-md py-2 px-3
            font-semibold text-richblack-50 cursor-pointer
            '
            >
                Cancel
            </button>
            <IconBtn
              text="save"
              type="submit"
            />
        </div>
    </form>
  )
}

export default EditProfile
