import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars';
import getAverageRating from '../../../utils/avgRating';

const Course_Card = ({course, height}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = getAverageRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])
  return (
    <div>
       <Link to={`/courses/${course._id}`}>
           <div>
               <div className='rounded-lg'>
                   <img 
                      src={course?.thumbnail}
                      alt='course ka thumbnail'
                      className={`${height} w-full object-cover  rounded-lg`}
                   />
               </div>
               <div className='flex flex-col gap-2 px-1 py-3'>
                    <p className='text-xl text-richblack-5'>
                        {course?.courseName}
                    </p>
                    <p className="text-sm text-richblack-50">
                        {course?.instructor?.firstName} {course?.instructor?.lastName}
                    </p>
                    <div className='flex items-center gap-2'>
                        <span className='text-yellow-5'>{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount}/>
                        <span className='text-richblack-400'>
                            {console.log("avgReviewCount",avgReviewCount)}
                            {course?.ratingAndReviews?.length} Ratings
                        </span>
                    </div>
                    <p className='text-richblack-5 text-xl border-b border-b-richblack-100 '>{course?.price}</p>
               </div>
           </div>
       </Link>
    </div>
  )
}

export default Course_Card
