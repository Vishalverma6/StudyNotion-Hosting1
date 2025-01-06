import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import getAverageRating from '../utils/avgRating';
import Error from "./Error";
import ConfirmationModal from "../components/common/ConfirmationModal"
import RatingStars from "../components/common/RatingStars"
import formatDate from "../services/formatDate"
import CourseDetailsCard from '../components/core/CourseDetails/CourseDetailsCard';
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import ReactMarkdown from 'react-markdown';


const CourseDetails = () => {

    const {user} = useSelector((state)=> state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();
    const [courseData, setCourseData] =useState(null);
    const [averageReviewCount, setAverageReviewCount] = useState(0);
    const [totalNoOfLectures, setTotalNoOfLectures] =useState(0);
    const {loading} = useSelector((state)=> state.profile);
    const {paymentLoading} = useSelector((state)=> state.course);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [isActive, setIsActive] = useState(Array(0));
    
   
    const handleActive = (id) => {
      setIsActive(
        !isActive.includes(id) 
         ? isActive.concat(id)
         :isActive.filter((e) => e!= id)
      )
    }

    useEffect(()=> {
      const getCourseFullDetails = async() => {
        try{
          const result = await fetchCourseDetails(courseId);
          setCourseData(result);
        }
        catch(error){
          console.log("could not fetch the course Details ")
        }
      }
      getCourseFullDetails();
    },[courseId])

    useEffect(()=> {
      const count = getAverageRating(courseData?.data?.courseDetails?.ratingAndReviews);
      setAverageReviewCount(count);
    },[courseData])

    useEffect(() => {
      let lectures =0;
      courseData?.data?.courseDetails?.courseContent?.forEach((sec)=> {
         lectures += sec?.subSection.length || 0
      })

      setTotalNoOfLectures(lectures);
    },[courseData])



    console.log("COurseData...",courseData);
    console.log("averageReviewCount...",averageReviewCount);

    // TO Update
    const handleBuyCourse =()=> {
        console.log("bt button nclick")
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch)
            return;
        }

        setConfirmationModal({
          text1:"You are not Logged In",
          text2: "Please login to purchase the course",
          btn1Text: "Login",
          btn2Text: "Cancel",
          btn1Handler: () => navigate("/login"),
          btn2handler: () => setConfirmationModal(null),
        })
        
    }
    
    

    if(loading || !courseData){
      return (
        <div className='flex mx-auto  items-center justify-between mt-40'>
           
            <div className='spinner'></div>
        </div>
      )
    }

    if(!courseData.success){
      return(
        <div>
           <Error/>
        </div>
      )
    }


    const {
      // _id:course_id,
      courseName,
      courseDescription,
      thumbnail,
      price,
      whatYouWillLearn,
      ratingAndReviews,
      instructor,
      studentsEnrolled,
      courseContent,
      createdAt,
    } = courseData?.data?.courseDetails

    if(paymentLoading){
      return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className='spinner'></div>
        </div>
      )
    }

  return (
    <div className='flex text-white w-full  flex-col   gap-3 '>
      
       <div className='relative w-full  bg-richblack-800'>
        {/* hero Section */}

          <div className=' mx-auto box-content px-4 lg:w-[1120px] relative 2xl:relative' > 
              <div className='mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8
              lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px] '>
                {/* Thumnnail */}
                <div className='max-h-[30px] relative block lg:hidden'>
                 <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                   <img
                     src={thumbnail}
                     alt='course thumbnail'
                     className='aspect-auto w-full'
                   />
                </div>
                
                <div className={`z-30 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}>
                   <p className='text-3xl font-bold text-richblack-5 sm:text-[38px]'>
                     {courseName}
                   </p>

                   <p className='text-richblack-200'>{courseDescription}</p>
                    <div className='flex flex-wrap text-md  items-center gap-2'>
                      <span className='text-yellow-25'>{averageReviewCount}</span>
                      <RatingStars Review_Count ={averageReviewCount} size={24}/>
                      <span>{`(${ratingAndReviews.length} reviews)`}</span>
                      <span>{`(${studentsEnrolled.length} Students Enrolled )`}</span>

                    </div>
                    <div>
                    <p className='flex  gap-2'>
                      Created By 
                      <span className='font-semibold'>{`${instructor.firstName} ${instructor.lastName}`}</span>
                    </p>
                    </div>
                    <div className='flex flex-wrap gap-4 text-md'>
                      <p className='flex items-center gap-2'>
                        {" "}
                      <BiInfoCircle />Created At {formatDate(createdAt)}
                      </p>
                      <p className="flex items-center gap-2">
                        {" "} 
                        <HiOutlineGlobeAlt /> English
                      </p>
                    </div>
                </div>
                

              
              </div>
              {/* Course Card */}
              <div className='absolute right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-[340px] max-w-[400px] translate-y-24 md:translate-y-0 lg:absolute lg:block'>
                  <CourseDetailsCard
                    course={courseData?.data?.courseDetails}
                    setConfirmationModal= {setConfirmationModal}
                    handleBuyCourse ={handleBuyCourse}
                  />
              </div>
          </div>
       </div>

      
       <div className='mx-auto px-4 text-richblack-5 lg:w-[1120px] text-start box-content'>
         <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[750px]'>
          {/* What Will you learn section */}
            <div className='flex flex-col  my-8 border  border-richblack-600 px-6 py-4'>
                <p className='text-3xl font-semibold'>What You Will learn </p>
                <div className='mt-4'>
                   {whatYouWillLearn} 
                </div>
              </div>


              <div className='max-w-[800px]'>
                {/* Course content Section */}
                  <div className='flex flex-col gap-3'>
                      <p className='text-[24px] font-semibold'>
                        Course Content
                      </p>
                  
                    <div className='flex flex-wrap  justify-between gap-1'>
                    <div className='flex gap-2'>
                      <span>{courseContent.length} section(s)</span>
                      <span>
                        {totalNoOfLectures} lectures
                      </span>
                      <span>
                        {courseData?.data?.totalDuration} total length
                      </span>
                    </div>

                    <div>
                        <button
                          onClick={() => setIsActive([])}
                        >
                            Collapse all sections 
                        </button>
                    </div>
                   </div>
                  </div>
          </div>
         </div>

          

       </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default CourseDetails
