import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
import { BiArrowBack } from 'react-icons/bi';

const UpdatePassword = () => {
    const location= useLocation();
    const dispatch= useDispatch();
    const[formData,setFormData]= useState({
        password:"",
        confirmPassword:"",
    })
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]= useState(false);
    const {loading}= useSelector((state)=> state.auth);

    const {password,confirmPassword}= formData;

    const changeHandler =(event) => {
        setFormData( (prevData)=> (
            {
                ...prevData,
                [event.target.name]:event.target.value,
            }
        ))
    }

    const submitHandler =(event) => {
        event.preventDefault();
        const token= location.pathname.split("/").at(-1);
        dispatch(resetPassword(password,confirmPassword,token));
    }

  return (
    <div className=' flex mx-auto mt-[90px] ml-[300px] items-center'>
      {
        loading ? (
            <div className='spinner'>
                Loading...
            </div>
        ) : (
            <div className='max-w-[500px] p-4 lg:p-6'>
               <h1 className='text-[1.875rem] font-semibold leading-[2.375] text-richblack-5'>
                  Choose new Password 
                </h1>
               <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>Almost done. Enter your new password and you're all set</p>
               <form onSubmit={submitHandler}>
                  <label className='relative'>
                     <p className=' mb-1 text-richblack-5 text-[0.875rem] leading-[1.375rem]'>
                        New Password <sup className='text-red-500'>*</sup></p>
                     <input
                     required
                     type={showPassword ? "text": "password"} 
                     name='password'
                     value={password}
                     onChange={changeHandler}
                     placeholder='password'
                     className='text-richblack-5 form-style w-full bg-richblack-700
                     !pr-10 p-[5px] rounded-md px-4'
                     />
                     <span 
                     onClick={() => setShowPassword((prev)=> !prev)}
                     className='absolute right-2 top-[32px] z-[10] cursor-pointer'
                     >
                        {
                            showPassword 
                            ? <AiFillEyeInvisible fontSize={24} fill='#AFB2BF' /> 
                            : <AiFillEye fontSize={24} fill='#AFB2BF'/>
                        }
                     </span>
                  </label>

                  <label className='relative mt-3 block'>
                     <p className=' mb-1 mt-4 text-richblack-5 text-[0.875rem] leading-[1.375rem]'>
                        Confirm New Password <sup className='text-red-500'>*</sup></p>
                     <input
                     required
                     type={showConfirmPassword ? "text": "password"} 
                     name='confirmPassword'
                     value={confirmPassword}
                     onChange={changeHandler}
                     placeholder='Confirm password'
                     className='text-richblack-5 form-style w-full bg-richblack-700
                     !pr-10 p-[5px] rounded-md px-4'
                     />
                     <span 
                     onClick={() => setShowConfirmPassword((prev)=> !prev)}
                     className='absolute right-2 top-[32px] z-[10] cursor-pointer'
                     >
                        {
                            showConfirmPassword 
                            ? <AiFillEyeInvisible fontSize={24} fill='#AFB2BF' /> 
                            : <AiFillEye fontSize={24} fill='#AFB2BF'/>
                        }
                     </span>
                  </label>
                  <button 
                  type='submit'
                  className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[11px] px-[12px] font-medium text-richblack-900'
                  >
                    Reset Password
                  </button>
               </form>
               <div className="mt-6 flex items-center justify-between">
                <Link to={"/login"}>
                    
                    <p className='flex items-center gap-x-2 text-richblack-5'>
                        <BiArrowBack />
                        Back to Login</p>
                </Link>
               </div>
            </div>
        )
      }
    </div>
  )
}

export default UpdatePassword
