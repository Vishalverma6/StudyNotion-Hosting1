import React from 'react'
import HighlightText from '../Homepage/HighlightText';
import CTAButton from "../Homepage/Button"

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];


const LearningGrid = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 mx-auto w-[350px] xl:w-fit mb-12 p-5  lg:w-fit'>
      {
        LearningGridArray.map((card,index) => {
          return (
            <div key={index} 
            className={`${index=== 0 && "lg:col-span-2 lg:h-[240px] p-3"} 
             ${card.order %2=== 1 ? "border-richblack-700 lg:h-[240px] p-5":"bg-richblack-800 lg:h-[240px] p-5"}
             ${card.order ===3 && "lg:col-start-2"}
             ${card.order<0 && "bg-transparent"}
             `}
             >
              {
                card.order < 0
                ? (
                  <div className='flex flex-col lg:w-[80%] gap-3 pb-5'>
                      <div className='text-3xl font-semibold'>
                         {card.heading}
                         {<HighlightText text={card.highlightText}/>}
                      </div>
                      <p className='font-medium text-richblack-300 text-[14px]'>
                        {card.description}
                      </p>
                      <div className='w-fit mt-2'>
                        <CTAButton active={true} linkto={card.BtnLink}>
                          {card.BtnText}
                        </CTAButton>
                      </div>
                  </div>
                )
                : (<div className='flex flex-col gap-8 p-4 '>
                      <h1 className='text-lg text-richblack-5'>
                          {card.heading}
                        </h1>
                         <p className='text-richblack-300 font-medium text-[14px]'>
                          {card.description}
                         </p>
                        
                   </div>
                   )
              }
            </div>
          )
        })
      }
       
    </div>
  )
}

export default LearningGrid
