import React from 'react'
import HighlightText from '../components/core/Homepage/HighlightText'
import bannerImage1 from "../assets/Images/aboutus1.webp"
import bannerImage2 from "../assets/Images/aboutus2.webp"
import bannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/Aboutpage/Quote'
import Foundingstory from "../assets/Images/FoundingStory.png"
import Stats from '../components/core/Aboutpage/Stats'
import LearningGrid from '../components/core/Aboutpage/LearningGrid'
import ContactFormSection from '../components/core/Aboutpage/ContactFormSection'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'



const About = () => {

  return (
    <div className='mt-[90px] text-richblack-25 mx-auto'>
      {/* section 1  */}
      <section className='bg-richblack-700'>
         <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col 
          justify-between gap-10 text-center text-white'>
             <header className='mx-auto py-20 text-3xl font-semibold lg:w-[70%]'>
                Driving Innovation in Online Education for a
                <HighlightText text={"Brighter Future"}/>
                <p className='mx-auto mt-3 text-center text-base  font-medium text-richblack-300 lg:w-[95%]'>
                    Studynotion is at the forefront of driving innovation in online education.We are 
                    passionate about creating a brighter future by offering cutting-edge courses,
                    leveraging emerging technologies ,and nurturing a vibrant learning community.
                </p>
             </header>
             <div className="sm:h-[50px] lg:h-[120px]"></div>
             <div className='absolute flex gap-x-3 lg:gap-x-5 bottom-0 left-[50%] w-[100%]
             translate-x-[-50%] translate-y-[30%] '>
                <img src={bannerImage1} alt=''/>
                <img src={bannerImage2} alt=''/>
                <img src={bannerImage3} alt=''/>
             </div>
         </div>
      </section>

      {/* section 2  */}
      <section className='border-b border-richblack-700'>
        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col
        justify-between gap-10 text-richblack-500'>
            <div className='h-[100px]'></div>
            <Quote/>
        </div>
      </section>

      {/* section 3 */}
      <section>
         <div className='flex flex-col gap-10 w-11/12 max-w-maxContent mx-auto justify-between text-richblack-500'>
            {/* upper part */}
             <div className='flex flex-col items-center gap-10 lg:flex-row justify-between'>
                <div className='my-24 flex flex-col lg:w-[50%] gap-10'>
                    <h1 className='bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045]  bg-clip-text text-transparent text-3xl font-semibold lg:w-[70%]'>
                        Our Founding Story
                    </h1>
                    <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                        Our e-learming platform was born out of a shared vision and passion for 
                        transfering education. It all began with a group of educators, technlogists, and 
                        lifelong learners who recognized the need for accessible, flexible ,and 
                        high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                        As experienced educators ourslves, we witnessed firsthand the limitations and 
                        challanges of traditional education system. We believed that education should not
                        be confined to the walls of a classroom or restricted by geographical boundries.
                        We envisioned a platform that could bridge these gaps and empower individuals from 
                        all walks of life to unlock their full potential.
                    </p>
                </div>
                <div>
                    <img 
                    src={Foundingstory}
                    alt=''
                    className="shadow-[0_0_50px_0] shadow-[#FC6767]"/>
                </div>
             </div>

             {/* lower part */}
             <div className='flex flex-col items-center lg:gap-10 lg:flex-row justify-between'>
                <div className='my-24 flex flex-col gap-10 '>
                    <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                        Our Vision</h1>
                    <p className='text-base font-medium text-richblack-300 lg:w-[95%]
                    '>
                        With this vision in mind, we set out on a journey to create an e-learning 
                        platform that would revolutionize the way people learn. Our team of dedicated 
                        experts worked tirelessly to develop a robust and intuitive platform that combines
                        cutting-edge Technology with engaging content, fodtering a dynamic and interactive 
                        learning experience.
                    </p>
                </div>
                {/* right part */}
                <div className='my-24 flex flex-col gap-10'>
                    <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                        Our Mission
                        </h1>
                    <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>Our Mission goes beyond just delivering courses online. W wanted to create a
                        vibrant community of learners, where individuals can connect, collaborate, and 
                        learn from one another. We believe that knowledge thrives in an environment of 
                        sharing and dialogue, and we faster this spirit of collaboration through forums,
                        live sessions, and networking opportunities.
                    </p>
                </div>
             </div>
         </div>
      </section>

      {/* section 4  */}
      <section className='w-full'>
          <Stats/>
      </section>

      {/* section 5  */}
      <section className='w-11/12 max-w-maxContent flex flex-col mx-auto mt-20 gap-10 text-white mb-[140px]'>
        <LearningGrid/>
        <div className='max-w-[400px] mx-auto'>
            <ContactFormSection/>
        </div>
      </section>

      {/* section 6 */}
      <section className='flex flex-col items-center justify-center gap-4 mb-16'>
         <div className='text-center text-3xl font-semibold'>
            <h1>Reviews from other learn</h1>
            
         </div>
          {<ReviewSlider/>}
      </section>
       
       {/* footer section */}
       <div className=''>
          <Footer/>
       </div>
    </div>
  )
}

export default About
