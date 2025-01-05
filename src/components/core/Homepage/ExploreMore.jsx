import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];
const ExploreMore = () => {

    const [currentTab,setCurrentTab]= useState(tabsName[0]);
    const [courses,setCourses]=useState(HomePageExplore[0].courses)
    const [currentCard,setCurrentCard]= useState(HomePageExplore[0].courses[0].heading)

    const setMyCards= (value)=> {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag===value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
  return (
    <div className=''>
        <div className='text-3xl font-semibold text-center'>
            Unlock the 
            <HighlightText text={"Power of Code"} />
        </div> 
        <p className='text-center text-richblack-300 text-sm
        text-[16px] mt-3 '>
            Learn to build anything you can imagine
        </p>

        <div className='flex rounded-full bg-richblack-800 mt-5 mb-5 border border-richblack-700
         px-1 py-1'>
            {
                tabsName.map( (element,index) => {
                    return(
                        <div className={`text-[12px] flex flex-row items-center gap-2
                        ${currentTab===element 
                        ? "bg-richblack-900 text-richblack-5 font-medium"
                        :"text-richblack-200"} rounded-full cursor-pointer transition-all duration-200
                         hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2 `} 
                         key={index} 
                         onClick={ () => setMyCards(element)}>
                            {element}
                        </div>
                    )
                })
            }
        </div>

        <div className='lg:h-[150px]'></div>

        {/* Course Card ka group */}

        <div className='absolute flex -mt-[140px] -translate-x-28  gap-2 justify-between'>
            {
                courses.map( (element,index) => {
                    return(
                        <CourseCard
                        key={index}
                        cardData= {element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                        
                        />
                    )
                })
            }
        </div>
    </div>
  )
}

export default ExploreMore
