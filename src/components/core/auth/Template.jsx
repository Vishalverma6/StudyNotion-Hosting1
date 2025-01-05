import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

const Template = ({title,desc1,desc2,image1,image2,formtype}) => {
  return (
    <div className='flex w-11/12 max-w-[1050px] justify-between py-12 mx-auto gap-y-12 mt-7 gap-x-36'>
      {/* left Part */}
      <div className='mx-auto w-11/12 max-a-[450px] md:mx-0 px-10'>
        <h1 className='text-richblack-5 text-[1.875rem] font-semibold leading-[2.375rem]'>{title}</h1>
        <p className='mt-4 text-[1.125rem] leading-[1.625rem]'>
          <span className='text-richblack-100'>{desc1}</span> {" "}
          <span className='font-edu-sa font-bold italic text-blue-100 text-[1rem]'>{desc2}</span>
        </p>
        {formtype === "signup" ? (<SignupForm/>) :(<LoginForm/>)}
      </div>

      {/* Right part */}
      <div className='relative mx-auto w-11/12 max-w-[450px]  md:mx-0'>
        <img src={image2}
             alt='Pattern'
             width={400}
             height={354}
             loading='lazy'
        />

        <img src={image1}
        alt='Students'
        width={400}
        height={354}
        loading='lazy'
        className='absolute -top-3 right-12 z-10'
        />
      </div>
    </div>
  )
}

export default Template
