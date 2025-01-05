import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {
    const dispatch= useDispatch();
    const navigate =useNavigate();


    const [formData, setFormData]= useState({
           email:"", 
           password:"",
    });

    const {email,password}= formData

    const [showPassword, setShowPassword]=useState(false);

    function changeHandler(event) {
        setFormData((prevData) => (
            {...prevData,
                [event.target.name]:event.target.value
            }
        ))
    }

    function visibilityHandler(){
        setShowPassword((prev) => !prev)
    }
    
    function submitHandler(event){
        event.preventDefault();
        dispatch(login(email,password,navigate))

        console.log("Printing the form Data :",formData)
    } 

  return (
    <div>
        <form onSubmit={submitHandler} 
        className='flex flex-col w-full gap-y-4 mt-6'>
            <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Email address <sup className='text-pink-200'>*</sup>
                </p>
                <input
                 required type='email'
                 value={formData.email}
                 placeholder='Enter email address'
                 name='email'
                 onChange={changeHandler}
                 className='bg-richblack-800 rounded-[.5rem] text-richblack-5 w-full p-[8px] border-b-2' 
                />
            </label>

            <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Password <sup className='text-pink-200'>*</sup>
                </p>
                <input
                required type={showPassword ? ("text"): ("password")}
                value={formData.password} 
                placeholder='Enter Password'
                name='password'
                onChange={changeHandler}
                
                className='bg-richblack-800 rounded-[.5rem] text-richblack-5 w-full p-[8px] border-b-2  '
                />
                <span onClick={visibilityHandler} 
                className='absolute right-3 top-[38px] cursor-pointer'
                >
                    {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):
                    (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                </span>

                <Link to="/forgot-password">
                    <p className='text-lg mt-1 text-blue-100 max-w-max ml-auto'>
                        Forgot Password
                    </p>
                   
                </Link>
            </label>
            <button type='submit'
            className='bg-yellow-50 mt-6 rounded-[8px] py-[8px]
            px-[12px] font-medium text-richblack-900 w-full'>
                Sign In
            </button>
        </form>
    </div>
  )
}

export default LoginForm
