
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { useNavigate} from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

const PublishCourse = () => {

    const {register,handleSubmit,setValue,getValues} = useForm();
    const [loading, setLoading]= useState(false);
    const dispatch= useDispatch();
    const {course}= useSelector((state) => state.course)
    const navigate = useNavigate();
    const {token} = useSelector((state)=> state.auth)
    

    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public",true)
        }
    },[])
    const goBack =() => {
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async() => {
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
        (course?.status === COURSE_STATUS.DRAFT && getValues("public")=== false)) {
            // no updation in form
            // no need to make api Call
            goToCourses();
            return;
        }
        // if from is updated
        const formData= new FormData();
        formData.append("courseId", course._id)
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status",courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData,token)

        if(result){
            goToCourses();
        }
        setLoading(false);
    }
    const onSubmit =() => {
        handleCoursePublish();
    }
  return (
    <div className='rounded-md border-[1px] bg-richblack-800 border-richblack-700
     p-6'>
       <p className="text-xl font-semibold text-richblack-5">
        Publish Setting
       </p>
       <form onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-5'
       >
          {/* check box */}
           <div className='flex my-5 mb-7'>
              <label htmlFor='public' className='inline-flex items-center text-lg'>
              <input
               type='checkbox'
               id='public'
               {...register("public")}
               className='rounded h-4 w-4 bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5'
              />
                 <span className='ml-3 text-richblack-400'>
                     Make this Course as Public
                 </span>
              </label>
           </div>

           {/* Next prev button */}
           <div className='flex items-center  justify-end gap-x-3'>
               <button 
                disabled={loading}
                type='button'
                onClick={goBack}
                className='flex items-center rounded-md bg-richblack-300 border-[1px] border-richblack-700 py-[6px] px-[11px] font-semibold
                text-richblack-900'
               >
                   Back
               </button>
               <IconBtn
               disabled={loading}
                 text="Save Changes"
                 
               />
           </div>
       </form>
    </div>
  )
}

export default PublishCourse
