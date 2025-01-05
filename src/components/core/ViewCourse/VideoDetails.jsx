import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { BigPlayButton, Player } from 'video-react';
import 'video-react/dist/video-react.css';
import { FaPlayCircle } from 'react-icons/fa';
import IconBtn from '../../common/IconBtn';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';


const VideoDetails = () => {

    const {courseId, sectionId, subSectionId } = useParams();
    // const trimmedCourseId = courseId.trim();
    //  const trimmedSectionId = sectionId.trim();
    //  const trimmedSubSectionId = subSectionId.trim();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playerRef = useRef();
    const location = useLocation();
    const {token} = useSelector((state) => state.auth);
    const {courseSectionData,courseEntireData,completedLectures} = useSelector((state) => state.viewCourse);

    const [videoData, setVideoData] =useState([]);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if(!courseSectionData){
            return ;
        }
        const setVideoSpecificDetails = async() => {
            if(!courseSectionData.length)
                return;
            if(!courseId, !sectionId, !subSectionId){
                navigate("/dashboard/enrolled-courses")
            }
            else{
                // let's assume all 3 feilds are present

                console.log("courseSectionData",courseSectionData)
                const filteredData = courseSectionData?.filter(
                    (course) => course?._id === sectionId
                )
                
                console.log("filteredData",filteredData)

                const filterdVideoData = filteredData?.[0]?.subSection?.filter(
                    (data) => data?._id === subSectionId
                )
                console.log("filterdVideoData",filterdVideoData)

                setVideoData(filterdVideoData?.[0]);
                setVideoEnded(false)
            }
        }

        setVideoSpecificDetails();
    },[courseSectionData, courseEntireData, location.pathname])

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (course) => course?._id === sectionId
        )
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
            (data) => data?._id === subSectionId
        )
        if(currentSectionIndex ===0 && currentSubSectionIndex === 0){
            return true;
        }
        else{
            return false
        }
    }

    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (course) => course?._id === sectionId
        )

        const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
            (data) => data?._id === subSectionId
        )
        
        if(currentSectionIndex === courseSectionData.length-1 &&
             currentSubSectionIndex === noOfSubSections-1){
            return true;
        }
        else{
            return false;
        }
    }


    const gotToNextVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (course)=> course?._id === sectionId
        )
        console.log("currentSectionIndex",currentSectionIndex)

        const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length

        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
            (data) => data?._id === subSectionId
        )

        if(currentSubSectionIndex !== noOfSubSections - 1){
            // same section ke next Video mein jao
            const nextSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex +1]?._id;
            console.log("courseSectionData[currentSectionIndex]",courseSectionData[currentSectionIndex])
            // move to next Video
            console.log("nextSubSectionId",nextSubSectionId)
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        }
        else{
            // different section ki first video
            const nextSectionId = courseSectionData[currentSectionIndex + 1]?._id;
            const nextSubSectionId = courseSectionData[currentSectionIndex +1]?.subSection[0]?._id;
            // next video par jao
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
        }
    }

    const goToPrevVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (course) => course?._id === sectionId
        )

        const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
            (data) => data?._id === subSectionId
        )

        if(currentSubSectionIndex !== 0){
            // same section ,prev Video
            const prevSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex - 1]?._id;
            // prev video par chale jao
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        }
        else{
            // different section ,last Video
            const prevSectionId = courseSectionData[currentSectionIndex - 1]?._id;
            const prevSubSectionLength = courseSectionData[currentSectionIndex - 1]?.subSection.length;
            const prevSubSectionId = courseSectionData[currentSectionIndex - 1]?.subSection[prevSubSectionLength - 1 ]?._id;
            // move to prev Video
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
        }

    }

    const handleLectureCompletion = async() => {
        // dummy code ,baad mein we will replace it wth actual code 

        setLoading(true);
        const response = await markLectureAsComplete({courseId: courseId, subSectionId: subSectionId},token)
        // stat update
        if(response){
            dispatch(updateCompletedLectures(subSectionId))
        }
        setLoading(false);
    }


  return (
    <div className='text-white w-full flex flex-col gap-5 mt-8'>
      {
        !videoData ? (
            <div className='text-lg'>
                No video found 
            </div>
        ): (
            <Player 
              ref={playerRef}
              aspectRatio="16:9"
              playsInline
              muted={true}
              onEnded={() => setVideoEnded(true)}
              src={videoData?.videoUrl}
              autoPlay={true}
              
            >
               <BigPlayButton position="center" />

                {
                    videoEnded &&(
                        <div 
                        style={{
                            backgroundImage:
                              "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                          }}
                        className='full absolute inset-0 z-[100] grid h-full place-content-center font-inter'
                         
                        >
                             {
                                !completedLectures.includes(subSectionId) && (
                                    <IconBtn
                                       disabled={loading}
                                       onclick={()=> handleLectureCompletion()}
                                       text={!loading ? "Mark As Completed" : "Loading "} 
                                       customClasses='text-lg max-w-max px-4 mx-auto '
                                    />
                                )
                             }

                             <IconBtn
                               disabled={loading}
                               onclick={() => {
                                if(playerRef?.current){
                                    playerRef?.current.seek(0)
                                    
                                    setVideoEnded(false);
                                }
                               }}
                               text="Rewatch"
                               customClasses='text-lg max-w-max px-4 mx-auto mt-2'
                             />

                             <div className='mt-10 flex min-w-[250px justify-center gap-x-4 text-lg]'>
                                {!isFirstVideo() && (
                                    <button 
                                      disabled={loading}
                                      onClick={goToPrevVideo}
                                      className='cursor-pointer bg-richblack-600 text-lg px-[16px] py-[1px] font-semibold text-richblack-5 rounded-md'
                                    >
                                        Prev
                                    </button>
                                )}
                                {!isLastVideo() && (
                                    <button 
                                      disabled={loading}
                                      onClick={gotToNextVideo}
                                      className='cursor-pointer bg-richblack-600 text-lg px-[16px] py-[1px] font-semibold text-richblack-5 rounded-md'
                                    >
                                        Next
                                    </button>
                                )}
                             </div>
                        </div>
                    )
                }
            </Player>
        )
      }

      <h1 className='mt-4 text-2xl font-semibold'>
        {videoData?.title}
      </h1>
      <p className='pt-2 pb-6'>
        {videoData?.description}
      </p>
    </div>
  )
}

export default VideoDetails
