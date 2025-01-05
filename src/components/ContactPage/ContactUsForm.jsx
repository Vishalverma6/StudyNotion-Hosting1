import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading, setLoading]= useState(false);
    const{
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }= useForm();

    const submitContactForm= async(data) => {
        console.log("Logging Data",data)
        try{
            setLoading(true);
        //    const response= await apiConnector("Post",contactusEndpoint.CONTACT_US_API,data);
            const response= {status:"OK"};
              console.log("Logging response",response)
               setLoading(false);
        }
        catch(error){

        }

    }

    useEffect( () => {
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNumber:"",
            })
        }
    },[reset,isSubmitSuccessful])


  return (
      <form className='flex flex-col gap-7' 
      onSubmit={handleSubmit(submitContactForm)}
      >

        <div className='flex flex-col gap-5 '>
            {/* first Name and lats name   */}
           <div className='flex flex-col lg:flex-row gap-5 '>
                {/* firstName */}
                <div className='flex flex-col gap-2 lg:w-[48%] '>
                    <label htmlFor='firstName '
                    className='lable-style'>
                        First Name</label>
                    <input
                    type='text'
                    name='firstName'
                    id='firstName'
                    placeholder='Enter First Name'
                    {...register("firstName",{required:true})}
                    className='text-richblack-300 bg-richblack-700 rounded-md p-[5px]'
                    />
                    {
                        errors.firstName &&(
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                Please Enter your first Name 
                            </span>
                        )
                    }
                </div>

                {/* lastName */}
                <div className='flex flex-col lg:w-[48%] gap-2'>
                    <label
                    className='lable-style' htmlFor='lastName'>last Name</label>
                    <input
                    type='text'
                    name='lastName'
                    id='lastName'
                    placeholder='Enter last Name'
                    {...register("lastName")}
                   className='text-richblack-300 bg-richblack-700 rounded-md p-[5px]'
                    />
                </div>
           </div>

            {/* email */}
            <div className='flex flex-col gap-1'>
                <label 
                className='lable-style'
                htmlFor='email'>Email Address</label>
                <input
                   type='email'
                   name='email'
                   id='email'
                   placeholder='Enter Your email Address'
                   {...register("email",{required:true})}
                  className='text-richblack-300 bg-richblack-700 rounded-md p-[5px]'
                />
                {
                    errors.email && (
                        <span className='-mt-1 text-[12px] text-yellow-100'>
                            Please Enter your email address
                        </span>
                    )
                }
            </div>

            {/* Phone number */}
            <div className='flex flex-col gap-1'>
                <label className='lable-style' 
                htmlFor='phoneNumber'>Phone Number</label>

                <div className='flex gap-5 '>
                    {/* DropDown */}
                    <div className='flex w-[81px] flex-col gap-2'>
                        <select 
                           name='dropdown'
                           id='dropdown'
                           {...register("countrycode",{required:(true)})}
                           className='text-richblack-300 bg-richblack-700 rounded-md p-[5px] py-[6px] form-style w-[70px]'
                        >
                            {
                                CountryCode.map((element,index) => {
                                    return(
                                       <option className='w-[20px] bg-richblack-800' 
                                       key={index} value={element.code}>
                                        
                                           {element.code}-{element.country}

                                       </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className='flex flex-col w-[calc(100%-90px)] gap-2 '>
                        <input
                           type='number'
                           name='phoneNumber'
                           id='phoneNumber'
                           placeholder='12345 67890'
                           className='text-richblack-300 bg-richblack-700 rounded-md p-[5px]'
                           {...register("phoneNumber" ,
                            {required:{value:true,message:"Please Enter Phone Number"},
                            maxLength:{value:10,message:"Invalid Phone Number"},
                            minLength:{value:8,message:"Invalid Phone number"}})}
                        />

                        {
                            errors.phoneNumber &&(
                                <span className='-mt-1 text-[12px] text-yellow-100'>
                                    Please Enter Phone Number
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* message  */}
            <div className='flex flex-col gap-2'>
                <label className='lable-style'
                htmlFor='message'>message</label>
                 <textarea
                      name='message'
                      id='message'
                      cols="30"
                      rows="7"
                      placeholder='Enter Your Message'
                      {...register("message",{required:true})}
                      className='text-richblack-300 bg-richblack-700 rounded-md p-[5px]'
                 />
                 {
                    errors.message && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            PLease Enter Your message
                        </span>
                    )
                 }
            </div>
            {/* Button */}
            <button disabled={loading}
            type='submit'
                className={`rounded-md bg-yellow-50 py-3 px-6 text-black text-center text-[13px] font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
                    ${
                        !loading && "transition-all duration-200 hover:scale-95 hover:shadow-none"
                    } disabled:bg-richblack-500 sm:text-[16px]`}
                >
                    Send Message
            </button>
        </div>
       
      </form>
  )
}

export default ContactUsForm
