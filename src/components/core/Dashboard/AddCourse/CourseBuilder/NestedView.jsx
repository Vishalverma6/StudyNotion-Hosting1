import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { RxDropdownMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux'
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { AiFillCaretDown } from 'react-icons/ai';

const NestedView = ({handleChangeEditSectionName}) => {

    const {token}= useSelector((state)=> state.auth);
    const {course} =useSelector((state)=> state.course);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection =async(sectionId)=> {
        const result = await deleteSection(sectionId,token,{
            courseId:course._id
        })
        console.log("Section ID..",sectionId)
        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }



    const handleDeleteSubSection = async(subSectionId,sectionId) => {
        const result= await deleteSubSection({
            subSectionId,
            sectionId,token
        })
        if(result){
            // extra kya kar sakte hain yahan par
            const updatedCourseContent = course.courseContent.map((section) => 
            section._id === sectionId ?result : section);
           const updatedCourse = {...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }


  return (
    <div className='text-white mt-10'>

       <div className='rounded-lg bg-richblack-700 border-[5px] border-richblack-700
       py-5 px-6'>
           {
            course?.courseContent?.map((section) => (
                <details key={section._id} >

                    <summary className='flex items-center justify-between  border-b-2 border-richblack-600 py-2'>
                        <div className='flex gap-x-3 items-center'>
                            <RxDropdownMenu />
                            <p className='font-semibold text-richblack-5'>
                                {section.sectionName}
                            </p>
                        </div>
                        <div className='flex items-center gap-x-3'>
                             <button 
                              onClick={() =>handleChangeEditSectionName(section._id, section.sectionName)}
                             >
                                 <MdModeEdit className='text-xl text-richblack-300' />
                             </button>
                             
                             <button 
                              onClick={() =>  setConfirmationModal(
                                {
                                text1: "Delete This Section",
                                text2: "All the lectures in this section will be deleted ",
                                btn1Text: "Delete",
                                btn2Text: "Cancel",
                                btn1Handler: () => handleDeleteSection(section._id),
                                btn2Handler: () => setConfirmationModal(null),
                            })
                            }
                             >
                                <MdDelete className='text-xl text-richblack-300' />
                             </button>

                             <span className='font-medium text-richblack-300'>|</span>
                             <div className='text-xl text-richblack-300'>
                                <AiFillCaretDown className={`text-xl text-richblack-300 cursor-pointer`} />
                             </div>
                        </div>
                        
                    </summary>
                    
                   

                    
                    <div>
                        {
                            section.subSection.map((data)=> (
                                <div
                                 key={data._id}
                                 onClick={() => setViewSubSection(data)}
                                 className='flex items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-1'
                                >
                                    <div className='flex items-center gap-x-3 py-2'>
                                        <RxDropdownMenu  className="text-2xl text-richblack-50"/>
                                        <p className="font-semibold text-richblack-50" >{data.title}</p>
                                    </div>

                                    <div
                                      onClick={(e)=> e.stopPropagation()}
                                      className='flex items-center gap-x-3'
                                    >
                                        <button
                                         onClick={() => setEditSubSection({...data,sectionId:section._id})}
                                        >
                                              <MdModeEdit className="text-xl text-richblack-300" />
                                        </button>

                                        <button
                                          onClick={()=> setConfirmationModal({
                                                text1: "Delete This Sub Section",
                                                text2: "Selected lectures will be deleted ",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                btn2Handler: () => setConfirmationModal(null),
                                          })}
                                        >
                                            <MdDelete className="text-xl text-richblack-300" />
                                        </button>
                                        
                                    </div>
                                </div>
                            ))
                        }

                        
                        {/* Add ne lecture to ssection */}
                        <button 
                            onClick={() => setAddSubSection(section._id)}
                            className='mt-4 flex items-center gap-x-1 text-yellow-50'
                          >
                            <FiPlus  className='text-lg'/>
                            <p>Add Lectures</p>
                        </button>
                    </div>
                    
                </details>
                
            ))
            
           }  
          
       </div>

       <div className='flex items-center justify-center '>

            {addSubSection ? (<SubSectionModal 
                    modalData={addSubSection}
                    setModalData={setAddSubSection}
                    add={true}
            />) 
            : viewSubSection ? (<SubSectionModal 
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                    view={true}
            />)
            : editSubSection ? (<SubSectionModal
                    modalData={editSubSection}
                    setModalData={setEditSubSection}
                    edit={true}
                />) 
            : <div></div>}
       </div>

       {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal}/>
       ) 
       :(<div></div>)}
    </div>
  )
}

export default NestedView
