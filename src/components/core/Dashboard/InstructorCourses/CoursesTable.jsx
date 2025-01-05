import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { COURSE_STATUS } from '../../../../utils/constants';
import { RiDraftFill } from 'react-icons/ri';
import { MdDelete, } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import formatDate from '../../../../services/formatDate';
import { FaCheck } from 'react-icons/fa';

const CoursesTable = ({courses, setCourses}) => {

    const TRUNCATE_LENGTH = 30
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();
    const [confirmationalModal,setConfirmationalModal] = useState(null);

    const handleCourseDelete =async(courseId)=> {
        setLoading(true);
        await deleteCourse({courseId:courseId},token);
        const result = await fetchInstructorCourses(token);

        if(result){
            setCourses(result);
        }
        setConfirmationalModal(null);
        setLoading(false);
    }

    console.log("courses...",courses)
    
  return (
    <div>
       <Table className='border border-richblack-800 rounded-xl'>
          <Thead>
               <Tr className='flex gap-x-10 border-b border-b-richblack-800 rounded-t-md px-6 py-2'>
                  <Th className='flex-1 text-left text-sm font-medium uppercase text-richblack-100'>
                     Courses
                  </Th>
                  <Th className='text-left text-sm font-medium uppercase text-richblack-100'>
                     Duration
                  </Th>
                  <Th className='text-left text-sm font-medium uppercase text-richblack-100'>
                     Price
                  </Th>
                  <Th className='text-left text-sm font-medium uppercase text-richblack-100'>
                     Actions
                  </Th>
               </Tr>
          </Thead>
          <Tbody>
              {
                courses?.instructorCourses?.length === 0 ? (
                    <Tr>
                        <Td className='py-10 text-center text-2xl font-medium text-richblack-100'>
                            No Courses Found 
                        </Td>
                    </Tr>
                )
                :(
                    courses?.instructorCourses?.map((course) => (
                        <Tr key={course._id} 
                        className='flex gap-x-10 border-b border-richblack-800  py-8 px-6'>
                            <Td className='flex flex-1 gap-x-4'>
                                <img
                                  src={course?.thumbnail}
                                  alt={course?.courseName}
                                  className='h-[140px] w-[220px] rounded-lg object-cover'
                                />
                                <div className='flex flex-col justify-between'>
                                    <p className='text-lg font-semibold text-richblack-5'>
                                        {course?.courseName}
                                    </p>
                                    <p className="text-xs text-richblack-300">
                                        {course?.courseDescription.split(" ").length >
                                        TRUNCATE_LENGTH
                                        ? course.courseDescription
                                            .split(" ")
                                            .slice(0, TRUNCATE_LENGTH)
                                            .join(" ") + "..."
                                        : course.courseDescription}
                                    </p>
                                    <p className='text-[12px] text-white'>
                                        Created: {formatDate(course.createdAt)} </p>
                                        {console.log("course.createdAt",course.createdAt)}
                                    {
                                        course?.status === COURSE_STATUS.DRAFT ?
                                        (    
                                              <p className='flex gap-x-1  items-center text-pink-100 bg-richblack-700 
                                              w-fit rounded-full px-[6px] py-[2px] font-medium text-sm'>
                                                <RiDraftFill size={14} />
                                                 Drafted
                                                </p>
                                           
                                        )
                                        :(
                                            <p className='flex w-fit gap-x-1 items-center rounded-full bg-richblack-700 px-[6px] py-[2px] text-yellow-100 font-medium'> 
                                                <div className='flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700'>
                                                  <FaCheck size={8} />
                                                </div>
                                                PUBLISHED
                                             </p>
                                         )
                                    }
                                </div>
                            </Td>
                            <Td className='text-md mr-3  font-medium text-yellow-200'>
                               {courses?.totalDuration}
                            </Td>
                            <div className='border-r'></div>

                            <Td className='text-sm  font-medium text-richblack-100'>
                               {course?.price}
                            </Td>
                            <Td className='text-sm font-medium text-richblack-100'
                            title='edit'>
                                <button
                                 disabled={loading}
                                 onClick={()=> (
                                    navigate(`/dashboard/edit-course/${course._id}`)
                                 )}
                                className='px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300'
                                >
                                    <AiFillEdit size={20}/>
                                    
                                </button>
                                <button
                                 disabled={loading}
                                 onClick={() => (
                                    setConfirmationalModal({
                                        text1:"Do you want to delete this course",
                                        text2: "All the data related to this course will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: !loading? ()=> handleCourseDelete(course._id) : ()=>{},
                                        btn2Handler: !loading ? ()=> setConfirmationalModal(null) : ()=> {},
                                    })
                                 )}
                                 title='Delete'
                                 className='px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]'
                                >
                                  <MdDelete size={20} />
                                </button>
                            </Td>
                        </Tr>
                    ))
                )
              }
          </Tbody>
       </Table>
       {confirmationalModal && (<ConfirmationModal modalData={confirmationalModal}/>)}
    </div>
  )
}

export default CoursesTable
