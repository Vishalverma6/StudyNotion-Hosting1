import React from 'react'
import { FaStarOfDavid } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import { removeFromCart } from '../../../../slices/cartSlice'

const RenderCartCourses = () => {

    const dispatch= useDispatch();

    const {cart}= useSelector((state)=> state.cart)

    console.log("cart...",cart);
  return (
    <div className='text-white flex flex-col flex-1'>
      {
        cart.map((course,index) => (
            <div 
            key={course?._id}
             className={`flex  w-full flex-wrap items-start justify-between gap-6 ${
              index !== cart.length -1 && ("border-b border-b-richblack-400 pb-6")
             } ${index !== 0 && "mt-6"}`}
            >
                {/* left part  */}
                <div className='flex flex-1 flex-col gap-4 xl:flex-row'>
                   <img 
                   src={course?.thumbnail}
                   alt={course?.courseName}
                   width="75px"
                   className='h-[140px] w-[220px] rounded-lg object-cover'
                   />
                   <div className='flex flex-col space-y-1'>
                      <p className="text-lg font-medium text-richblack-5">{course?.courseName}</p>
                      <p className="text-sm text-richblack-300">{course?.category?.name}</p>
                      <div className='flex items-center gap-2' >
                         <span className='text-yellow-5'>
                           {course?.ratingAndReviews?.map((rating) => rating?.rating || 0) }
                         </span>
                         <ReactStars
                          count={5}
                          size={20}
                          activeColor="#ffd700"
                          edit={false}
                          value={course?.ratingAndReviews?.map((rating) => rating?.rating )}
                          emptyIcon={<FaStarOfDavid />}
                          fullIcon={<FaStarOfDavid />}
                         />
                         <span className='text-richblack-400'>
                          {course?.ratingAndReviews?.length} Ratings</span>
                      </div>
                   </div>
                </div>

                {/* Right part */}

                <div className='flex flex-col items-end gap-2'>
                    <button
                    onClick={()=>dispatch(removeFromCart(course._id)) }
                    className='flex items-center gap-x-1 rounded-md  border border-richblack-600 bg-richblack-700 py-[10px] px-[10px] text-pink-200'
                    >
                        <MdDelete />
                        <span>Remove</span>
                    </button>
                    <p className='mt-4 text-2xl font-medium text-yellow-100'>
                      Rs {course?.price}</p>
                </div>
            </div>
        ))
      }

      
    </div>
  )
}

export default RenderCartCourses
