import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
   <div className='fixed inset-0  ml-[10px]   flex flex-col items-center justify-center '>
      
      <div className=" absolute  inset-0   bg-black bg-opacity-50 backdrop-blur-sm"></div>
       <div className='flex   flex-col z-10 items-start bg-richblack-900 text-center
       gap-4 p-4 border-[4px] border-richblack-600 rounded-md'>
            <div className= 'flex flex-col items-start gap-5 '>
                <p className='text-white text-3xl font-semibold'>
                    {modalData.text1}
                </p>
                <p className='text-richblack-200 text-[16px]'>
                    {modalData.text2}
                </p>
            </div >
            <div className='flex  gap-x-10'>
                <div className='text-2xl '>
                    <IconBtn 
                    customClasses='px-3 py-1 text-[20px]'
                    onclick={modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                    />
                </div>
                <button className='bg-richblack-400 py-1 rounded-md px-3 text-richblack-900 text-[20px]'
                onClick={modalData?.btn2Handler}>
                    {modalData?.btn2Text}

                </button>
            </div>
      </div>
      
   </div>
  )
}

export default ConfirmationModal
