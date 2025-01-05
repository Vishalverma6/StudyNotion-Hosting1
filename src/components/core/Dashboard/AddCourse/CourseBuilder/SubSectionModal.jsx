import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross2 } from 'react-icons/rx';
import Upload from '../CourseInformation/Upload';
import IconBtn from '../../../../common/IconBtn';

const SubSectionModal = ({modalData,
                          setModalData,
                          add=false,
                          view=false, 
                          edit=false,}) => {

  
  const {
      register,
      handleSubmit,
      setValue,
      formState:{errors},
      getValues,
  }  = useForm();
  
  const dispatch = useDispatch();
  const [loading,setLoading]= useState(false);
  const {token}= useSelector((state)=> state.auth);
  const {course} =useSelector((state)=> state.course);

  
  useEffect(()=> {
    if(view || edit){
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  },[modalData,view,edit]);

  console.log("description  before formUpdated ..",modalData.description);

  const isFormUpdated = () => {
    const currentValues= getValues();
    if(currentValues.lectureTitle !== modalData.title ||
       currentValues.lectureDesc !== modalData.description ||
       currentValues.lectureVideo !== modalData.videoUrl){
        return true;
       }
       else{
        return false; 
       }
  }
  console.log("description  after formUpdated ..",modalData.description);


  const handleEditSubSection =async() => {
    const currentValues= getValues();
    const formData= new FormData();

    formData.append("sectionId",modalData.sectionId);
    formData.append("subSectionId",modalData._id);

    if(currentValues.lectureTitle !== modalData.title){
      formData.append("title",currentValues.lectureTitle)
    }

    console.log("modalData",modalData);
    console.log("description 2...",modalData.description)
    if(currentValues.lectureDesc !== modalData.description){
      formData.append("description",currentValues.lectureDesc);
    }
    
    if(currentValues.lectureVideo !== modalData.videoUrl){
      formData.append("video",currentValues.lectureVideo);
    }

    setLoading(true);
    // API CALl
    const result = await updateSubSection(formData,token);

    if(result){
      // TODO : same Check
      const updatedCourseContent = course.courseContent.map((section) => 
        section._id === modalData.sectionId ?result : section);
      const  updatedCourse = {...course,courseContent:updatedCourseContent}
      dispatch(setCourse(updatedCourse));
      
    }

    setModalData(null);
    setLoading(false);
  }


  
  const onSubmit = async(data) => {
    if(view)
      return;

    if(edit){
      if(!isFormUpdated()){
        toast.error("No changes made to the subSection")
      }
      else{
        // edit kardo store mein 
        handleEditSubSection();
      }
      return;
    }

    // add 
    const formData = new FormData();
    formData.append("sectionId",modalData);
    formData.append("title",data.lectureTitle);
    formData.append("description",data.lectureDesc);
    formData.append("video",data.lectureVideo);
    setLoading(true);
    // Api Call
   
    const result = await createSubSection(formData,token);

   
    if(result){
      // TODO: Check for updation
      const updatedCourseContent = course.courseContent.map((section) => 
        section._id === modalData ?result : section);
       const updatedCourse = {...course,courseContent:updatedCourseContent}
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  }
  


  return (
    <div className=' fixed inset-0 z-[1000] !mt-0 grid place-items-center h-screen w-screen overflow-auto bg-white bg-opacity-10 backdrop-blur-sm border-[3px] rounded-md
    '>
       <div className="flex flex-col my-10 w-11/12 max-w-[500px] rounded-lg border border-richblack-400  bg-richblack-800">
       {/* Modal Header */}
          <div className='flex items-center justify-between bg-richblack-700 p-4 rounded-t-lg'>
             <p className='text-xl font-semibold text-richblack-5'>
              {view && "Viewing"} {add && "Adding"} {edit && "Editing"} 
              Lecture
              </p>
             <button   onClick={() => (!loading ? setModalData(null) : {})}>
                 <RxCross2 className="text-2xl text-richblack-5" />
             </button>
          </div>

          {/* Modal Form  */}
          <form onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col px-8 py-8 gap-6'
          >
             <Upload
               name="lectureVideo"
               label="Lecture Video"
               register={register}
               errors={errors}
               video={true}
               setValue={setValue}
               viewdata={view ? modalData.videoUrl : null}
               editData= {edit ? modalData.videoUrl : null}
             />
             
             {/* Lecture Title */}
             <div className='flex flex-col gap-2'>
                <label className="text-sm text-richblack-5" htmlFor="lectureTitle">Lecture Title {!view && <sup className="text-pink-200">*</sup>} </label>
                <input
                  id='lectureTitle'
                  placeholder='Enter Lecture Title'
                  {...register("lectureTitle",{required:true})}
                  className='form-style w-full'
                />
                {errors.lectureTitle && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Lecture Title is Required**
                  </span>
                )}
             </div>
             <div className='flex flex-col gap-2'>
                <label className="text-sm text-richblack-5" htmlFor='lectureDesc'>
                  Lecture Description
                  {!view && <sup className="text-pink-200">*</sup>}
                  </label>
                <textarea
                 id='lectureDesc'
                 placeholder='Enter Lecture Description'
                 {...register("lectureDesc",{required:true})}
                 className='form-style resize-x-none w-full min-h-[130px]'
                />
                {
                  errors.lectureDesc && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                       Lecture Description is Required**
                    </span>
                  )
                }
             </div>

             {
               !view && (
                <div className='flex justify-end mb-2'>
                   <IconBtn
                    type="submit"
                     text={loading ? "Loading..." : edit ? "Save Changes": "Save"}
                   />
                </div>
               )
             }
          </form>
       </div>
    </div>
  )
}

export default SubSectionModal
