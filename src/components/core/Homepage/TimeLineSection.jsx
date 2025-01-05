import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline= [
    {
        Logo:Logo1,
        heading:"Leadership",
        description:"Fully committed to the success company ",
    },
    {
        Logo:Logo2,
        heading:"Leadership",
        description:"Fully committed to the success company ",
    },
    {
        Logo:Logo3,
        heading:"Leadership",
        description:"Fully committed to the success company ",
    },
    {
        Logo:Logo4,
        heading:"Leadership",
        description:"Fully committed to the success company ",
    },
]

const TimeLineSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-15 items-center'>
            {/* left part */}
            <div className='w-[45%] flex flex-col gap-5'>
                {
                    timeline.map( (Element ,index) => {
                        return (
                            <div className='flex flex-row gap-6' key={index}>
                                <img src={Element.Logo}
                                alt='Logo'/>
                                <div className='flex flex-col gap-5'>
                                    <h2 className='font-semibold text-[16px]'>{Element.heading}</h2>
                                    <p className='text-base'>{Element.description}</p>
                                </div>

                                {/* HW ...... vertical line  */}
                            </div>
                        )
                    })
                }
            </div>

            {/* right part */}
            <div className='relative shadow-blue-200'>
                <img src={timelineImage}
                 alt='timelineImage'
                 className='shadow-white object-cover h-fit'
                 />

                 <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-6
                    left-[50%] translate-x-[-50%] translate-y-[-60%]'>
                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300
                    px-6'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                    </div>
                    <div className='flex flex-row items-center gap-5 px-7'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>Type of Courses</p>
                    </div>
                 </div>
            </div>

        </div>
    </div>
  )
}

export default TimeLineSection
