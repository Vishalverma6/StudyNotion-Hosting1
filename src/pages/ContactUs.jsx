import React from 'react'
import Footer from '../components/common/Footer'
import ContactUsForm from '../components/ContactPage/ContactUsForm'
import { TiMessages } from 'react-icons/ti'
import { FaInternetExplorer } from 'react-icons/fa'
import { IoCall } from 'react-icons/io5'
import ReviewSlider from '../components/common/ReviewSlider'

const ContactUs = () => {
  return (
    <div className=' flex flex-col '>
        {/* section 1 */}
       <section className='mx-auto  mt-14 mb-10'>
          <div className='flex lg:flex-row mx-auto gap-x-10 '>
                {/* left part */}
            <div className='flex flex-col gap-8 bg-richblack-800
            border h-fit rounded-md p-8 lg:w-[40%]'>
                <div>
                    <div className='flex gap-x-4 text-richblack-5'>
                        <TiMessages 
                        className='text-richblack-100 ' fontSize={22} />  
                        <h1 className='text-richblack-5'>Chat on us</h1>
                    </div>
                    <p className='text-richblack-300 text-[13px] '>Our friendly team is here to help</p>
                    <p className='text-richblack-300 text-[13px] '>info@Studynotion.com</p>
                </div>

                <div>
                    <div className='flex gap-x-4 text-richblack-5'>
                        <FaInternetExplorer />
                        <h1>Visit us</h1>
                    </div>
                    <div className='flex flex-col text-richblack-300 text-[13px] '>
                        <p>Come and sy hello at our office HQ</p>
                        <p>Akshay Nagar 1st Block 1st Cross, Rammurat Nagar</p>
                        <p>Banglore-560016</p>
                    </div>
                </div>

               <div>
                   <div className='flex gap-4 text-richblack-5 font-semibold items-center'>
                        <IoCall />
                        <h1>Call us</h1>
                    </div>
                    <div className='text-richblack-300 text-[13px]'>
                        <p>Mon-Fri From 8am to 5pm</p>
                        <p>+123 456789</p>
                    </div>
               </div>
            </div>

            {/* Right part */}
            <div className='text-white border-2  rounded-md p-10 border-richblack-800
            max-w-[500px] lg:w-[56%]'>
                <h1 className='text-2xl'>
                    Got a Idea? We've got the skills. Let's team up
                </h1>
                <p className='text-richblack-300'>Tell us more about yourself and what you're got in mind</p>

                <div >
                    <ContactUsForm/>
                </div>
            </div>
          </div>
       </section>


       {/* section 2  */}
       <section className='relative mx-auto my-20 text-richblack-5 bg-richblack-900'>
           <div className='flex flex-col gap-y-4'>
             {/* Reviews from other learners */}
             <h1 className='text-center text-3xl font-semibold mt-8'>
                Reviews from other learners
             </h1>

              {/* Reviews Slider */}
              <ReviewSlider/>
            </div>
       </section>
       {/* section 3 */}
        <div>
            <Footer/>
        </div>
      
    </div>
  )
}

export default ContactUs
