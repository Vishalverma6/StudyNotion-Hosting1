import React, { useEffect, useState } from 'react'
import { IoChevronBackOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { BsChevronDown } from 'react-icons/bs';

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus]= useState("");
    const [videoBarActive,setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId, subSectionId} = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse);

    
    

    
    useEffect(() => {
        
        const setActiveFlags = () => {
            if(!courseSectionData.length)
                return;
            
            const currentSectionIndex = courseSectionData?.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            const  activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.
            [currentSubSectionIndex]?._id;
            // Set Current section here
            setActiveStatus(courseSectionData[currentSectionIndex]?._id);
            console.log('courseSectionData?.[currentSectionIndex]?._id',courseSectionData[currentSectionIndex]?._id)
            // set Current sub-section here 
            setVideoBarActive(activeSubSectionId);
        }
        setActiveFlags();
    },[courseSectionData, courseEntireData, location.pathname])
  return (
   <>
     <div className='text-white flex flex-col  bg-richblack-800 border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] w-[280px] max-w-[350px]   '>
         {/* for buttons and heading  */}
         <div className='mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-b-richblack-600 py-5 text-lg font-bold text-richblack-25'>
            {/* for buttons  */}
            <div className='flex w-full items-center justify-between  '>
                <div 
                  onClick={() => 
                    navigate("/dashboard/enrolled-courses")
                    
                  }
                  className='flex h-[35px] w-[35px] items-center justify-center bg-richblack-100 rounded-full p-1 text-richblack-800 hover:scale-90 cursor-pointer'
                  title='back'
                >
                  <IoChevronBackOutline />
                </div>

                <div>
                    <IconBtn
                      text="Add Review"
                      customClasses='ml-auto'
                      onclick={() => setReviewModal(true)}
                    />
                </div>
            </div>
            {/* for heading and title */}
            <div className='flex flex-col gap-[2px]'>
                <p>{courseEntireData?.courseName}</p>
                <p className='text-sm font-semibold text-richblack-500'>
                    {completedLectures?.length}/{totalNoOfLectures}
                </p>
               
            </div>
         </div>

         {/* for sections and subSection  */}
         <div className='h-[calc(100vh - 5rem)] overflow-y-auto'>
            {
                courseSectionData.map((course, index)=> (
                    <div 
                     onClick={() => setActiveStatus(course?._id)}
                     key={index}
                     className='mt-3 cursor-pointer text-sm text-richblack-5'
                    >
                        {/* sections  */}
                        <div className='flex  justify-between bg-richblack-600 px-5 py-4'>
                           <div className='w-[70%] font-semibold'>
                              {course?.sectionName}
                           </div>
                           {/* addition of  arrow icon and handle the rotate logic */}
                           <div className='flex items-center '>
                               <span className={`${
                                activeStatus === course?._id
                                ? "rotate-180"
                                : "rotate-0"
                                } transition-all duration-200`}>
                                   <BsChevronDown/>
                               </span>
                           </div>

                        </div>
                        
                        {/* sub sections */}
                        <div>
                            {
                                activeStatus === course?._id && (
                                    <div className=' transition-[height] duration-200 ease-in-out'>
                                        {
                                            course?.subSection.map((topic, index)=> (
                                                <div 
                                                 key={index}
                                                 className={`flex gap-3 px-5 py-2 ${
                                                    videoBarActive === topic?._id
                                                    ? "bg-yellow-200 text-richblack-800"
                                                    : "bg-richblack-900 text-white"
                                                 }`}
                                                 onClick={()=> {
                                                    
                                                    navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`)
                                                        setVideoBarActive(topic?._id)
                                                 }}
                                                >
                                                    <input
                                                      type='checkbox'
                                                      checked={completedLectures?.includes(topic?._id)}
                                                      onChange={()=> {}}
                                                    />
                                                    
                                                    <span className=''>
                                                        {topic?.title}
                                                    </span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ))
            }
         </div>
     </div>
   </>
  )
}

export default VideoDetailsSidebar
