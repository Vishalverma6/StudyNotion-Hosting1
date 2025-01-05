import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import ChipInput from './ChipInput';
import Upload from './Upload';
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import { COURSE_STATUS } from '../../../../../utils/constants';
import toast from 'react-hot-toast';
import { IoIosArrowForward } from 'react-icons/io';

const CourseInformation = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    }= useForm();

    const {token}= useSelector((state) => state.auth)
    const dispatch= useDispatch();
    const {course, editCourse} = useSelector((state)=> state.course);
    const [loading, setLoading]= useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

   

    
    useEffect(()=> {

        const getCategories = async()=> {
            setLoading(true);
            const categories= await fetchCourseCategories();
            console.log("categories: ",categories)
            if(categories.length >0){
                setCourseCategories(categories)
            }
        
            setLoading(false)
    
        }

        if(editCourse){
            setValue("courseTitle",course.courseName);
            setValue("courseShortDesc",course.courseDescription);
            setValue("coursePrice",course.Price);
            setValue("courseTags",course.Tag);
            setValue("courseBenefits",course.whatYouWillLearn);
            setValue("courseCategory",course.category)
            setValue("courseRequirements",course.instructions);
            setValue("courseImage",course.thumbnail)
        }

        getCategories()
    },[])

    
    const isFormUpdated= ()=> {
        const currentValues= getValues();
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory !== course.category ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail 

        )
            return true;
        else
            return false;
    }

    const onSubmit= async(data) => {

        if(editCourse){
            if(isFormUpdated){
                const currentValues=getValues();
                const formData= new FormData();
                formData.append("courseId",course._id);
                if(currentValues.courseTitle!==course.courseName){
                    formData.append("courseName",data.courseTitle);
                }

                if(currentValues.courseShortDesc!==course.courseDescription){
                    formData.append("courseDescription",data.courseShortDesc);
                }

                if(currentValues.coursePrice!==course.price){
                    formData.append("price",data.coursePrice);
                }
                if(currentValues.courseTags!==course.tag){
                    formData.append("tag",data.courseTags);
                }

                if(currentValues.courseBenefits!==course.whatYouWillLearn){
                    formData.append("whatYouWillLearn",data.courseBenefits);
                }

                if(currentValues.courseCatgeory._id !== course.category._id){
                    formData.append("category", data.courseCategory);
                }

                

                if(currentValues.courseRequirements.toString()!==course.instructions.toString()){
                    formData.append("instructions",JSON.stringify(data.courseRequirements));
                }

                if(currentValues.courseImage !== course.thumbnail){
                    formData.append("thumbnailImage", data.courseImage);
                }

            
                setLoading(true);
                const result = await editCourseDetails(formData,token)
                setLoading(false);
                if(result){
                    setStep(2)
                    dispatch(setCourse(result))
                }
            }
            else {
                toast.error("No changes made so far")
            }
            return;
        }

        // create a new Course
        const formData= new FormData();
        formData.append("courseName",data.courseTitle)
        formData.append("courseDescription",data.courseShortDesc)
        formData.append("price",data.coursePrice)
        formData.append("tag",data.courseTags)
        formData.append("whatYouWillLearn",data.courseBenefits)
        formData.append("category",data.courseCategory)
        formData.append("thumbnailImage",data.courseImage)
        formData.append("instructions",JSON.stringify(data.courseRequirements))
        formData.append("status",COURSE_STATUS.DRAFT);

        setLoading(true);
        const result = await addCourseDetails(formData,token)
        if(result){
            dispatch(setStep(2))
            dispatch(setCourse(result));
            setLoading(false);
        }
    }


  return (
   <div >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=' flex flex-col  gap-6 rounded-md border-richblack-700 bg-richblack-800 p-6
         w-full '
    >

        {/* Course Title */}
        <div className='flex flex-col gap-y-2' >
            <label className='text-sm text-richblack-5' htmlFor='courseTitle'>Course Title <sup className='text-red-500'>*</sup></label>
            <input
             name='courseTitle'
            
             id='courseTitle'
             placeholder='Enter Course Title'
             {...register("courseTitle",{required:true})}
             className='form-style w-full  '
            />
            {
                errors.courseTitle && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                        Course Title is required**
                    </span>
                )
            }
        </div>

        {/* Short Description */}
        <div className='flex flex-col gap-2' >
            <label className="text-sm text-richblack-5" htmlFor='courseShortDesc'>Course Short Description <sup className='text-red-500'>*</sup></label>
            <textarea
             id='courseShortDesc'
             placeholder='Enter description'
             {...register("courseShortDesc",{required:true})}
             className='min-h-[140px] resize-x-none w-full form-style'
            />
            {
                errors.courseShortDesc && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                        Course Description is required**
                    </span>
                )
            }
        </div>

        {/* Course Price  */}
        <div className=' flex flex-col gap-2'>
            <label className="text-sm text-richblack-5" htmlFor='coursePrice'>Course Price <sup className='text-red-500'>*</sup></label>
            <div className='relative'>
                    <input
                    id='coursePrice'
                    placeholder='Enter Course Price'
                    {...register("coursePrice",{
                        required:true,
                    valueAsNumber:true,
                    pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    },
                    })}
                    className='form-style w-full !pl-12'
                    />
                    <HiOutlineCurrencyRupee className='absolute top-1/2 -translate-y-1/2 left-3 text-2xl text-richblack-300'/>
            </div>
            {
                errors.coursePrice && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                        Course Price is required**
                    </span>
                )
            }
        </div>

        {/*Course category  */}
        <div className='flex flex-col gap-2'>
            <label className="text-sm text-richblack-5" htmlFor='courseCategory'>Course Category <sup className='text-red-500'>*</sup></label>
            <select
            className='form-style w-full'
             id='courseCategory'
             defaultValue=""
             {...register("courseCategory",{required:true})}
            >
                <option className='text-richblack-300' value="" disabled>Choose a Category</option>
                {
                    !loading && courseCategories.map((category,index)=> (
                        <option key={index} value={category?._id}>
                            {category.name}
                        </option>
                    ))
                        
                }
            </select>
            {
                errors.courseCategory &&(
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>Category is required**</span>
                )
            }
        </div>

        {/* create a custom component for tags input  */}
        <ChipInput
          label="Tags"
          name="CourseTags"
          placeholder="Enter tags and Press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* create a component for uploading and showing of preview of media */}
        <Upload
          label="Course Thumbnail"
          name="courseImage"
          errors={errors}
          register={register}
          setValue={setValue}
          editData={editCourse ? course?.thumbnail :null}
        />

        {/* Benefits of the Course */}
        <div className='flex flex-col gap-1'>
            <label className="text-sm text-richblack-5" htmlFor='courseBenefits'>Benefits of the Course <sup className='text-red-500'>*</sup></label>
            <textarea
             id='courseBenefits'
             placeholder='Enter Benefits of the Course'
             {...register("courseBenefits",{required:true})}
             className='min-h-[130px] resize-x-none w-full form-style'
            />
            {errors.courseBenefits && (
                <span className='ml-2 text-xs tracking-wide text-pink-200'>Benfits of the Course are Required**</span>
            )}
        </div>

        {/* requirements/Instructions  */}
        <div >
            <RequirementField
            name="courseRequirements"
            label="Requirements/Instruction"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />
        </div>

        <div className='flex justify-end gap-x-2'>
            {
                editCourse && (
                    <button
                     onClick={()=> dispatch(setStep(2))}
                     className='flex cursor-pointer items-center gap-x-2 bg-richblack-300 rounded-md py-1 px-[11px] font-semibold text-richblack-900'
                    >
                        Continue Without Saving
                    </button>
                )
            }

            <div>
                <IconBtn 
                
                text={!editCourse 
                    ? `Next ` 
                    : "Save Changes"}
                >
                    <IoIosArrowForward />
                    </IconBtn>
                
            </div>
        </div>
    </form>
   </div>
  )
}

export default CourseInformation
