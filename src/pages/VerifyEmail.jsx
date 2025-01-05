import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { sendOtp, signUp } from '../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

const VerifyEmail = () => {
    const [otp,setOtp]= useState("");
    const navigate= useNavigate();
    const dispatch=useDispatch();
    const {signupData,loading}= useSelector((state)=> state.auth);

    useEffect( ()=> {
        if(!signupData){
            navigate("/signup");
        }
    },[navigate,signupData])

    const submitHandler =(event)=> {
        event.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,        
        } = signupData;

        dispatch(signUp(accountType,firstName,lastName,email,password,
            confirmPassword,otp,navigate));


    }
  return (
    <div className='text-white flex items-center justify-center mt-[100px]'>
      {
        loading ?
        (<div className='spinner flex flex-col items-center justify-center  '>
           
        </div>)
        : (
            <div className="max-w-[500px] p-4 lg:p-6">
                <h1 className=" text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verify Email</h1>
                <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">A verification code has been sent to you .Enter the code below</p>
                <form className=''
                onSubmit={submitHandler}>
                   <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                       
                        renderInput={(props) => 
                        <input {...props} 
                        placeholder='-'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                          }}
                        className='text-richblack-5 w-[48px] lg:w-[40px] border-0 bg-richblack-800
                        rounded-[0.5rem] aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50
                        '/>}
                        containerStyle={{
                           
                            gap:"0 6px"
                        }}
                        />
                        <button type='submit'
                        className='w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px]
                        mt-6 font-medium text-richblack-900'
                        >
                            Verify Email
                        </button>
                </form>

                <div className='flex justify-between'>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to={"/login"}>
                            <p className='flex items-center gap-x-2'>
                               <BiArrowBack />
                                Back to Login</p>
                        </Link>
                    </div>

                    <button 
                    className='flex items-center text-blue-100 gap-x-2 mt-6'
                    onClick={() => dispatch(sendOtp(signupData.email,navigate))}>
                        Resend it
                    </button>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default VerifyEmail
