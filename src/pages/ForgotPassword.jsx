import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getpasswordResetToken } from '../services/operations/authAPI';
import { BiArrowBack } from 'react-icons/bi';

const ForgotPassword = () => {

    const [emailSent,setEmailSent]= useState(false);
    const [email,setEmail]= useState("");
    const {loading}= useSelector((state) => state.auth);
    const dispatch= useDispatch();
     

    const submitHandler= (event) => {
       event.preventDefault();
       dispatch(getpasswordResetToken(email,setEmailSent))
    }
  return (
    <div className='  flex mt-[90px] ml-[50px] items-center justify-center text-white'>
        {
            loading ? (
                <div className='spinner'></div>
            ) : (
                <div className='max-w-[500px] p- lg:p-6'>
                    <h1 className='text-[1.875rem] font-semibold leading-[2.375] text-richblack-5'>
                        {  
                            !emailSent ? "Reset your Password":"Check Your Email"
                        }
                    </h1>
                    <p className=' text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                        {
                            !emailSent ? 
                            "Have no fear. we'll email you intructions to reset your password. if you don't have access to your email we can try account recovery."
                            : `We have sent the reset email ${email }`
                        }
                    </p>

                    <form onSubmit={submitHandler}
                    className='flex flex-col'>
                        {
                            !emailSent && (
                                <label className='w-full'>
                                    <p className='mb-1 leading-[1.375] mt-4 text-[0.875rem] text-richblack-5'>
                                        Email Address <sup className='text-red-500'>*</sup>
                                    </p>
                                    <input 
                                       required
                                       type='email'
                                       name='email'
                                       value={email}
                                       onChange={ (e) => setEmail(e.target.value)}
                                       placeholder='Enter Your email addess'
                                       className='form-style w-full bg-richblack-500 text-richblack-5 p-2 rounded-md'
                                    />
                                </label>
                            )
                        }

                        <button 
                        type='submit'
                        className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[11px] px-[12px] font-medium text-richblack-900'
                        >
                            {
                                !emailSent ? "Submit": "Resend Email"
                            }
                        </button>
                    </form>

                    <div className='mt-6 flex items-center justify-between'>
                        <Link to="/login">
                           <p className='flex items-center gap-x-2 text-richblack-5'>
                            <BiArrowBack/>
                            Back to Login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword
