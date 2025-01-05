import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';

const Instructor = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourseDataWithStats = async() => {
            setLoading(true);

            // pending 
            const instructorApidata = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);
            console.log("instructorApidata",instructorApidata);

            if(instructorApidata.length){
                setInstructorData(instructorApidata)
            }
            
            if(result){
                setCourses(result);
                
            }
            setLoading(false);
            console.log("courses",courses)

        }
        getCourseDataWithStats();
    },[])

    const totalStudent = instructorData.reduce((acc, curr)=> acc + curr.totalStudentsEnrolled, 0) ;
    const totalAmount = instructorData.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
  return (
    <div  className='text-white flex flex-col mx-auto  '>
      <div className=' space-y-2'>
         <h1 className='text-2xl font-bold text-richblack-5'>
            Hi {user?.firstName} 👋
         </h1>
         <p className="font-medium text-richblack-200">
             Let's start something new
         </p>
      </div>

     <div>
        {loading ? (<div className='spinner'></div>)
        : courses.length > 0
        ? (<div>
                <div className=''>
                <div className='my-4 flex h-[450px] gap-x-4'>
                    {/* Render Chart /graph */}
                    {totalAmount > 0 || totalStudent > 0 ?
                    (<InstructorChart courses = {instructorData}/>)
                    : (
                        <div className="flex-1 rounded-md bg-richblack-800 p-6">
                            <p className="text-lg font-bold text-richblack-5">Visualize</p>
                            <p className="mt-4 text-xl font-medium text-richblack-50">
                                Not Enough Data To Visualize
                            </p>
                        </div>
                    )
                    }
                    
                    {/* Total Statistics */}
                    <div className=' flex min-w-[230px] flex-col rounded-md   bg-richblack-800 p-6'>
                        <p className="text-lg font-bold text-richblack-5">Statistics</p>
                        <div className="mt-4 space-y-4">
                        <p className='text-lg text-richblack-200'>
                            Total Courses
                        </p>
                            <p className='text-3xl font-semibold text-richblack-200'>{courses.length}</p>
                        </div>
                        
                        <div>
                        <p className="text-lg text-richblack-200">Total students</p>
                        <p className="text-3xl font-semibold text-richblack-50">{totalStudent}</p>
                        </div>
                        
                        <div>
                        <p className="text-lg text-richblack-200">Total Income</p>
                        <p className="text-3xl font-semibold text-richblack-50">
                            Rs. {totalAmount}</p>
                        </div>
                    </div>

                </div>
                </div>
            <div className='rounded-md bg-richblack-800 p-6 '>
                {/* Render 3 courses */}
                <div className='flex items-center justify-between'>
                    <p className="text-lg font-bold text-richblack-5" >Your Courses</p>
                    <Link to="/dashboard/my-courses">
                        <p className='text-yellow-50'>View all</p>                     
                    </Link>
                </div>
                <div className='my-4 flex items-start space-x-6'>
                    {
                        courses.slice(0, 3).map((course) => (
                            <div key={course._id}
                            className='w-1/3'
                            >
                                <img
                                src={course?.thumbnail}
                                alt='course ka photo'
                                className='h-[200px] w-full rounded-md object-cover '
                                />
                                <div className=' flex flex-col mt-3 w-full'>
                                    <p className="text-sm font-medium text-richblack-50">{course?.courseName}</p>
                                    <div className='mt-1 flex items-center  gap-x-2'>
                                        <p className="text-xs font-medium text-richblack-300">
                                            {course.studentsEnrolled.length} Students
                                        </p>
                                        <p className="text-xs font-medium text-richblack-300">|</p>
                                        <p className="text-xs font-medium text-richblack-300">
                                            Rs {course.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        
        )
        : (<div>
                <p>You have not created any courses yet</p>
                <Link to={"/dashboard/addCourse"}>
                    Create a Course
                </Link>
        </div>)}
     </div>
    </div>
  )
}

export default Instructor
