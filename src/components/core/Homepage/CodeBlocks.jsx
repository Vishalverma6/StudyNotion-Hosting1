import React from 'react'
import CTAButton from "../Homepage/Button"
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
    position, heading, subheading,ctabtn1, ctabtn2,codeblock,backgroundGradient,codeColor
}) => {
  return (
    <div className={`flex ${position} my-20  lg:gap-10  sm:flex-col gap-y-4 `}>

      {/* Section 1 */}
      <div className='w-[70%] lg:w-[50%] flex flex-col gap-8 px-24'>
         {heading}

         <div className='text-richblack-300 font-bold text-[14px]'>
            {subheading}
         </div>

         {/* div for button */}
         <div className=' flex flex-row gap-7 mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                <div className='flex gap-2 items-center'>
                   {ctabtn1.btnText}
                   <FaArrowRight></FaArrowRight>
                </div>
            </CTAButton>

            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                
               {ctabtn2.btnText}
            </CTAButton>
         </div>
      </div>

      {/* section 2 code blocks  */}
      <div 
        className={`h-fit flex flex-row  text-[10px] w-[60%] py-4 sm:text-sm sm:leading-6 lg:w-[520px] px-4 border border-richblack-800 `}>
         {/* HW : BG gradients (yellow in color) */}
        
       
         <div  
           className={`text-center sm:hidden lg:block flex flex-col w-[10%] text-richblack-400 font-bold font-inter `} >
             <p>1</p>
             <p>2</p>
             <p>3</p>
             <p>4</p>
             <p>5</p>
             <p>6</p>
             <p>7</p>
             <p>8</p>
             <p>9</p>
             <p>10</p>
             <p>11</p>
         </div>

         <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
            <TypeAnimation 
            sequence={[codeblock ,10000,""]}
            repeat={Infinity}
            cursor={true}
            style={
                {
                    whiteSpace:"pre-line",
                    display:"block"
                }
            }
            omitDeletionAnimation={true}
            />
         </div>
      </div>
    </div>
  )
}

export default CodeBlocks
