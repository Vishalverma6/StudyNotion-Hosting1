import copy from 'copy-to-clipboard';
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from 'react-icons/fa';

const CourseDetailsCard = ({course, setConfirmationModal, handleBuyCourse}) => {
    const {user}= useSelector((state) => state.profile)
    const {token} = useSelector((state)=> state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const handleAddToCart =() => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an Instructor, You cant buy a course");
            return;
        }
        if(token){
            dispatch(addToCart(course));
            return ;
        }
        setConfirmationModal({
            text1:"You are not logged in",
            text2:"Please login to add to cart",
            btn1Text:"login",
            btn2Text:"Cancel",
            btn1Handler:()=> navigate("/login"),
            btn2Handler:()=> setConfirmationModal(null),
        })
    }


    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard")
    }

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
    } = course

  return (
    <div className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}>
       <img
          src={ThumbnailImage}
          alt='Thumbnail '
          className='max-h-[300px] min-h-[180px] w-[350px] rounded-2xl overflow-hidden object-cover md:max-w-full'
       />
       <div className='flex gap-2 px-2  items-center'>
         <p className=''> Rs.</p>  
         <span className='text-2xl'>{CurrentPrice}</span>
       </div>
       <div className='flex flex-col   px-2 gap-4'>
           <button 
                className='bg-yellow-50  text-richblack-800 px-2 py-1 rounded-md'
                onClick={
                    user && course?.studentsEnrolled.includes(user._id) ? 
                    ()=> navigate("/dashboard/enrolled-courses")
                    : handleBuyCourse
                }
            >
               {
                user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course" :
                "Buy Now"
               }
           </button>

           {
            (!course?.studentsEnrolled.includes(user?._id)) && (
                <button 
                  className='bg-yellow-50 w-fit text-richblack-800 px-2 py-1 rounded-md'
                  onClick={handleAddToCart}
                >
                     Add to Cart
                </button>
            )
           }
       </div>

       <div>
          <p className='pb-3 pt-4 text-center text-sm text-richblack-50'>
             30-day Money-Back Guarantee
          </p>
          <p className='my-2 text-xl font-semibold'>
            This Course Includes:
          </p>
          <div className='flex flex-col gap-3 text-sm text-caribbeangreen-100'>
             {
                  course?.instructions?.map((item, index) => (
                     <p className='flex gap-2 items-center'
                     key={index}>
                        <BsFillCaretRightFill />
                        <span>{item}</span>
                     </p>
                  ))
             }
          </div>
         
       </div>
       <div className='text-center'>
              <button
                className='mx-auto flex items-center gap-2 py-6 text-yellow-100'
                onClick={handleShare}
              >
                <FaShareSquare size={15}/>
                   Share
              </button>
          </div>
    </div>
  )
}

export default CourseDetailsCard
