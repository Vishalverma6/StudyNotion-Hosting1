import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../common/IconBtn';
import { changePasssword } from '../../../../services/operations/settingsApi';
import { useSelector } from 'react-redux';

const UpdatePassword = () => {

    const {token}= useSelector((state)=> state.auth)

    const navigate= useNavigate();
    const [showOldPassword, setShowOldPassword]= useState(false);
    const [showNewPassword, setShowNewPassword]= useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] =useState(false);


    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitSuccessful},
        reset,
    }= useForm()

    const submitPasswordForm = async(data)=> {
        try{
            await changePasssword(token,data)
            
        }
        catch(error){
            console.log("ERROR MESSAGE-",error.message)
        }
    }

    useEffect(()=> {
        if(isSubmitSuccessful){
            reset({
                oldPassword:"",
                newPassword:"",
                confirmNewPassword:"",
            })
        }
    },[reset,isSubmitSuccessful])
  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>

         <div className=' w-9/12 flex flex-col gap-y-6 bg-richblack-800 border-[1px] border-richblack-700 rounded-md p-7 px-9'>
            <h2 className="text-lg font-semibold text-richblack-5">Password</h2>

            {/* current password and new password */}
            <div className='flex flex-col gap-5 lg:flex-row
            '>
                {/* current password */}
                <div className='relative flex flex-col gap-2 lg:w-[31%]'>
                    <label htmlFor='oldPassword' className='label-style'>
                        Current Password
                    </label>
                    <input
                     type={showOldPassword ? "text" : "password"}
                     name='oldPassword'
                     id="oldPassword"
                     placeholder='Enter Current Password'
                     className='form-style'
                     defaultValue=""
                     {...register("oldPassword",{required:true})}
                    />
                    <span onClick={()=> setShowOldPassword((prev)=>!prev)}
                      className='absolute right-3 top-[42px] z-[10] cursor-pointer'>
                        {showOldPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                        ): (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                        )}
                    </span>
                    {errors.oldPassword &&(
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter Current Password
                        </span>
                    )}
                </div>

                {/* new password */}
                <div className='relative flex flex-col gap-2 lg:w-[31%]'>
                    <label htmlFor='newPassword' className='label-style'>
                       New Password
                    </label>
                    <input
                     type={showNewPassword ? "text" : "password"}
                     id="newPassword"
                     name='newPassword'
                     placeholder='Enter new Password'
                     className='form-style'
                     defaultValue=""
                     {...register("newPassword",{required:true})}
                    />
                    <span 
                     onClick={()=> setShowNewPassword((prev)=> !prev)}
                    className='absolute  right-3 top-[42px] z-[10] cursor-pointer'>
                        {showNewPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                        ): (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                        )}
                    </span>
                    {errors.newPassword &&(
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter New Password
                        </span>
                    )}
                </div>

                {/* confirm New Password */}
                <div className='relative flex flex-col gap-2 lg:w-[31%]'>
                    <label htmlFor='confirmNewPassword' className='label-style'>
                        Confirm New Password
                    </label>
                    <input
                     type={showConfirmNewPassword ? "text" : "password"}
                     name='confirmNewPassword'
                     id="confirmNewPassword"
                     placeholder='Enter Confirm New Password'
                     className='form-style'
                     defaultValue=""
                     {...register("confirmNewPassword",{required:true})}
                    />
                    <span 
                    onClick={()=> setShowConfirmNewPassword((prev)=>!prev)}
                      className='absolute right-3 top-[42px] z-[10] cursor-pointer'>
                        {showConfirmNewPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                        ): (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                        )}
                    </span>
                    {errors.confirmNewPassword &&(
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter Confirm Password
                        </span>
                    )}
                </div>
            </div>

         </div>

         <div className=' w-9/12 mt-6 flex justify-end gap-2'>
            <button 
              onClick={()=> {
                navigate("/dashboard/my-profile")
              }}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
                Cancel
            </button>

            <IconBtn
             type="submit"
              text="Update"
             
            />
         </div>
      </form>
    </>
  )
}

export default UpdatePassword
