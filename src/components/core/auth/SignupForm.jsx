import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../../../slices/authSlice';
import { sendOtp } from '../../../services/operations/authAPI';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import Tab from '../../common/Tab';

const SignupForm = () => {
    const dispatch= useDispatch()
    const [formData,setFormData]= useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        phoneNumber:''
    });


    const navigate= useNavigate();
    const[showPassword,setShowPassword]= useState(false);
    const [showConfirmPassword,setShowConfirmPassword]= useState(false)
    
    const [accountType,setAccountType]=useState(ACCOUNT_TYPE.STUDENT)
    

    function changeHandler(event){
        setFormData((prev) =>(
            {
                ...prev,
                [event.target.name]:event.target.value
            }
        ))
    }

    function submitHandler(event){
        event.preventDefault();
        if(formData.password!==formData.confirmPassword){
            console.log("password do not match")
            toast.error("Password do not matched")
            return
        }
       
        const signupData={
            ...formData
        };
        const finalData= {
            ...signupData,
            accountType
        }
        dispatch(setSignupData(finalData))

        // for otp verification
        dispatch(sendOtp(formData.email,navigate))

        // reset
        setFormData({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
        })

        setAccountType(ACCOUNT_TYPE.STUDENT)

    }

    // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]
  
  return (
    <div>
         {/* tab  */}
        <Tab tabData={tabData} field={accountType} setField={setAccountType}/>

        <form onSubmit={submitHandler}>
            {/* first name and last name */}
            <div className='flex gap-x-4 mt-[20px]'>
                <label>
                    <p className='text-[0.875] text-richblack-5 mb-1 leading-[1.375]'>
                        First Name <sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                       type='text'
                       name='firstName'
                       value={formData.firstName}
                       placeholder='Enter First Name'
                       onChange={changeHandler}
                       className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-2'
                    />
                </label>
                <label>
                    <p className='text-[0.875] text-richblack-5 mb-1 leading-[1.375]'>
                        Last Name <sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                       type='text'
                       name='lastName'
                       value={formData.lastName}
                       placeholder='Enter Last Name'
                       onChange={changeHandler}
                       className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-2'
                    />
                </label>
            </div>

            {/* email address */}
            <div className='mt-[20px]'>
            <label>
                    <p className='text-[0.875] text-richblack-5 mb-1 leading-[1.375]'>
                        Email Address<sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                       type='email'
                       name='email'
                       value={formData.email}
                       placeholder='Enter email address'
                       onChange={changeHandler}
                       className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-2'
                    />
                </label>
                </div>

                {/* Phone Number */}
                <div className='mt-[20px]'>
                    
                    <label>
                            <p className='text-[0.875] text-richblack-5 mb-1 leading-[1.375]'>
                                Phone Number<sup className='text-pink-200'>*</sup>
                            </p>
                            <div className='flex gap-x-5  '>
                                <select id="country-code" name="country-code"
                                className='bg-richblack-800 text-richblack-300 rounded-[0.5rem]' 
                                >
                                        <option value="+91" selected>+91 (India)</option>
                                        <option value="+1">+1 (USA)</option>
                                        <option value="+44">+44 (UK)</option>
                                        <option value="+61">+61 (Australia)</option>
                                        <option value="+81">+81 (Japan)</option>
                                </select>
                        
                            <input 
                            type='tel'
                            name='phoneNumber'
                            value={formData.phoneNumber}
                            placeholder='Enter your Phone number'
                            pattern='[0-9]{10}'
                            onChange={changeHandler}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-2'
                            />
                            </div>
                        </label>
                </div>

                {/* password and confirm psssword */}
                <div className='flex gap-x-4 mt-[20px]'>
                <label className='relative'>
                    <p className='text-[0.875] text-richblack-5 mb-1 leading-[1.375]'>
                        Create Password<sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                       type={showPassword ?"text" : "password"}
                       name='password'
                       value={formData.password}
                       placeholder='Enter password'
                       onChange={changeHandler}
                       className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-2'
                    />
                    <span onClick={()=> setShowPassword((prev)=> !prev)}
                    className='absolute right-3  top-[38px] cursor-pointer'>
                        {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>):
                        (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)}
                    </span>
                </label>
                <label className='relative'>
                    <p className='text-[0.875] text-richblack-5 mb-1 leading-[1.375]'>
                        Confirm password<sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                       type={showConfirmPassword ? "text":"password"}
                       name='confirmPassword'
                       value={formData.confirmPassword}
                       placeholder='Confirm Password'
                       onChange={changeHandler}
                       className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-2'
                    />
                    <span onClick={()=> setShowConfirmPassword( (prev)=> !prev)}
                    className='absolute right-3 top-[38px]  cursor-pointer'
                    >
                          {
                            showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>):
                            (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)
                          }
                    </span>
                </label>

                </div>
                <button type='submit'
                className='bg-yellow-50 mt-6 rounded-[8px] py-[8px]
                px-[12px] font-medium text-richblack-900 w-full'>
                    Create Account
                </button>
        </form>
    </div>
  )
}

export default SignupForm
