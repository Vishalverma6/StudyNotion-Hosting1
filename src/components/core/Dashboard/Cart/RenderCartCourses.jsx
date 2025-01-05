import React from 'react'
import { FaStarOfDavid } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import { removeFromCart } from '../../../../slices/cartSlice'

const RenderCartCourses = () => {

    const dispatch= useDispatch();

    const {cart}= useSelector((state)=> state.cart)

  return (
    <div className='text-white'>
      {
        cart.map((course,index) => (
            <div>
                {/* left part  */}
                <div>
                   <img 
                   src={course?.thumbnail}
                   alt=''
                   width="75px"
                   />
                   <div>
                      <p>{course?.courseName}</p>
                      <p>{course?.category?.name}</p>
                      <div >
                         <span>
                           4.8
                         </span>
                         <ReactStars
                          count={5}
                          size={20}
                          activeColor="#ffd700"
                          edit={false}
                          emptyIcon={<FaStarOfDavid />}
                          fullIcon={<FaStarOfDavid />}
                         />
                         <span>{course?.ratingAndReviews?.lenght} Ratings</span>
                      </div>
                   </div>
                </div>

                {/* Right part */}

                <div>
                    <button
                    onClick={()=>dispatch(removeFromCart(course._id)) }
                    >
                        <MdDelete />
                        <span>Remove</span>
                    </button>
                    <p>Rs {course?.price}</p>
                </div>
            </div>
        ))
      }

      
    </div>
  )
}

export default RenderCartCourses
