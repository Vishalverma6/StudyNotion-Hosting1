import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import ReactStars from 'react-stars';
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';

const CourseReviewModal = ({setReviewModal}) => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const {courseEntireData} = useSelector((state) => state.viewCourse)

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    }  = useForm();


    useEffect(() => {
        setValue("courseExperience","")
        setValue("courseRating",0);
    },[])

    const ratingChanged =(newRating) => {
        setValue("courseRating",newRating)

    }

    const onSubmit = async(data) => {
        await createRating(
            {
                courseId:courseEntireData?._id,
                rating:data.courseRating,
                review:data.courseExperience
            },
            token
        );
        setReviewModal(false);

    }
  return (
    <div className=' fixed inset-0 backdrop-blur-sm z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-opacity-10  bg-white   items-center justify-center'>
       <div className='mt-8 w-11/12 min-w-[400px] max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>
          {/* Modal Header */}
          <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-4'>
             <p className='text-xl font-semibold text-richblack-25'>
                Add Review
             </p>
             <button 
               onClick={() =>setReviewModal(false)}
             >
                <IoClose className='text-2xl text-richblack-5' />
             </button>
          </div>

          {/* Modal Body */}
          <div className='p-6'>
             <div className='flex items-center justify-center gap-x-4'>
                 <img
                  src={user?.image}
                  alt={user?.firstName + "profile"}
                  className='aspect-square w-[50px] rounded-full object-cover'
                 />
            
                <div className='flex flex-col text-richblack-5'>
                    <p className='font-semibold'>{user?.firstName} {user?.lastName}</p>
                    <p className='text-sm'>Posting Publicly</p>
                </div>
             </div>
             <form 
              onSubmit={handleSubmit(onSubmit)}
              className='mt-6 flex flex-col items-center'
             >

                 <ReactStars 
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  color2={'#ffd700'}
  
                 />

                 <div className=' '>
                    <label htmlFor='courseExperience'
                     className='text-sm text-richblack-5'
                    >
                        Add Your Experience <sup className="text-pink-200">*</sup>
                    </label>
                    <textarea
                      id='courseExperience'
                      placeholder='Add your Experience Here'
                      {...register("courseExperience",{required:true})}
                      className='form-style w-full min-h-[120px] resize-x-none'
                    />
                    {
                        errors.courseExperience && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Please Add your Experience
                            </span>
                        )
                    }
                    
                 </div>

                 {/* Cancel and Save button */}
                 <div className=' mt-3 flex w-11/12 justify-end gap-x-3 ' >
                    <button
                     onClick={()=> setReviewModal(false)}
                     className='bg-richblack-300 flex cursor-pointer items-center px-[10px] py-[6px] rounded-md font-semibold text-richblack-900'
                    >
                        Cancel
                    </button>
                    <IconBtn
                     text="Save"
                    />
                 </div>
             </form>
          </div>
       </div>
    </div>
  )
}

export default CourseReviewModal
