import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { MdAddCircleOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { BiRightArrow } from 'react-icons/bi';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';

const CourseBuilderForm = () => {


  const {register,handleSubmit,setValue,
    formState:{errors}
  }  = useForm();
  const [editSectionName,setEditSectionName]= useState(null); 
  const dispatch = useDispatch();
  const [loading, setLoading]=useState(false);

  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state)=> state.auth);


  const onSubmit =async(data) => {
    setLoading(true);
    let result;
    if(editSectionName){
      // if we editing the section name 
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId:editSectionName,
          courseId:course._id,
        },token
      )
    }
    else{
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId:course._id,
        },token
      )
    }


    console.log("result ...",result)
    // update Values
    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName","");
    }
    // loading false
    setLoading(false);

  }

  const cancelEdit =() => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true))
  }

  const goToNext = () => {
    // next step par  tabhi jaa sakte hain jab ateleat ek section create ho 

    if(course.courseContent.length ===0){
      toast.error("Please add atleast one Section ");
      return;
    }
    if(course.courseContent.some((section)=> section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each section");
    }

    // for everything is good 
    dispatch(setStep(3));
  }
  


  // ek hi button ko click karne par
  const handleChangeEditSectionName= (sectionId,sectionName)=> {
    // agar data pahle se hai to un sab ko hata dega ()
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }

    // agar kuch bhi nhi likha hai to click karne par section id aur name enter kar dega 
    setEditSectionName(sectionId)
    setValue("sectionName",sectionName)
    

  }

  console.log("course.courseContent ",course.courseContent)
  console.log("Course at bUilder",course)

  return (
    <div className='space-y-6 bg-richblack-800 rounded-md border-[1px] border-richblack-700 p-6'>
      <h1 className='text-2xl font-semibold text-richblack-5'>Course Builder</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-2'>
             <label className="text-sm text-richblack-5" htmlFor='sectionName'>Section Name<sup className='text-red-500'>*</sup></label>
             <input
               id='sectionName'
               placeholder='Add Section Name to bulid your course'
               {...register("sectionName",{required:true})}
               className='form-style w-full'
             />
             {errors.sectionName && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Section Name is required**
              </span>
             )}
          </div>
          <div className='mt-5 flex items-end gap-x-4'>
             <IconBtn 
               type="submit"
              text={editSectionName ? "Edit Section Name" : "Create Section"}
               outline={true}
               customClasses=''
             >
                <MdAddCircleOutline size={20} className='text-yellow-50' />
             </IconBtn>
             {editSectionName && (
              <button 
               type='button'
               onClick={cancelEdit}
               className='text-sm text-richblack-300  underline'
              >
                 Cancel Edit
              </button>
             )}
          </div>
      </form>

      {
        course.courseContent.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName } />
        )
      }
      {/* Next Prev Button */}
      <div className='flex justify-end gap-x-3 mt-8'>
         <button 
          className='rounded-md cursor-pointer flex itemx-center
          bg-richblack-300  text-richblack-900 py-1 px-2 border-[1px] border-richblack-600'
           onClick={goBack}
         >
            Back
         </button>
         <IconBtn disabled={loading} text="Next"
          onclick={goToNext}
          >
            <BiRightArrow/>
         </IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm
