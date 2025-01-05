import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

const EditCourse = () => {

    const {courseId} = useParams();
    const {token}= useSelector((state)=> state.auth);
    const {course}= useSelector((state)=> state.course)
    const dispatch= useDispatch();
    const [loading, setLoading] =useState(false);

    useEffect(()=>{
        const populateCourseDetails = async() => {
            setLoading(true);
            const result =await getFullDetailsOfCourse(courseId,token)
            console.log("result 512 ",result)
            if(result.courseDetails){
                dispatch(setEditCourse(true))
                dispatch(setCourse(result.courseDetails))
            }
            setLoading(false);
        }

        populateCourseDetails();
    },[])

    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }
    
  return (
    <div className='w-11/12'>
       <h1 className='text-2xl mb-12 text-richblack-5 font-medium'>Edit Course</h1>
       <div className='mx-auto max-w-[500px]'>
          {
            course ? (<RenderSteps/>) : 
            (<p className='mt-14 text-center
             text-2xl font-semibold text-richblack-100'>
                Course not Found
            </p>)
          }
       </div>
    </div>
  )
}

export default EditCourse
