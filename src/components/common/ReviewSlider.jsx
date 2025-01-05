import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import ReactStars from 'react-stars';
import { apiConnector } from '../../services/apiconnector';
import { ratingsEndpoints } from '../../services/apis';
import { FaStar } from 'react-icons/fa6';


const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const truncatedeWords = 15;

    useEffect(() => {
        const fetchAllReviews = async()=> {
            const {data} = await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API,) 
            console.log(" reviews response ..",data);

            
            if(data?.success){
                setReviews(data?.data)
            }
            console.log("reviews...",reviews)
        }
        fetchAllReviews();
    },[]);


  return (
    <div className='text-white mx-auto '>
        <div className='min-h-[180px] max-w-maxContent '>
            <Swiper 
             slidesPerView={4}
             spaceBetween={24}
             loop={true}
             freeMode={true}
             autoplay={{
                delay:2500,
             }}
             modules={[FreeMode, Pagination, Autoplay]}
             className='w-full '
            > 

            {
                reviews.map((review, index) => (
                    <SwiperSlide key={index} 
                     className='bg-richblack-800 flex flex-col gap-4 px-3 py-4 rounded-md border border-richblack-700'
                    >
                         <div className='flex gap-x-3 '>
                            <img
                                src={review?.user?.image 
                                ? review?.user?.image 
                                : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                                alt='user profile picture'
                                className='h-10 w-10 object-cover rounded-full'
                            />
                           <div className='flex flex-col justify-center -mt-2 capitalize  '>
                                <p className='text-lg'>
                                    {review?.user?.firstName} {review?.user?.lastName}
                                </p>
                                <p className='text-richblack-300'>
                                    {review?.course?.courseName}
                                </p>
                           </div>
                         </div>
                          <p className='text-md font-semibold'>
                            {review?.review}
                          </p>
                          <div className='flex  gap-3 '>
                                <p className='text-yellow-50 font-semibold py-[5px]'>{review?.rating.toFixed(1)}</p>
                                <ReactStars
                                    count={5}
                                    value={review?.rating}
                                    size={24}
                                    edit={false}
                                    activeColor= "ffd700"
                                    emptyIcon= {<FaStar/>}
                                    fullIcon ={<FaStar/>}
                                    className='font-semibold'
                                />
                          </div>
                    </SwiperSlide>
                ))
            }
            </Swiper>
        </div>
    </div>
  )
}

export default ReviewSlider
