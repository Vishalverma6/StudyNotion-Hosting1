import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";


import Course_Card from './Course_Card';


const CourseSlider = ({courses}) => {
  return (
       <>
       <div className=''>
          
         { 
            courses?.length ? ( 
                 <Swiper
                   slidesPerView={1}
                   loop={true}
                   spaceBetween={20}
                   pagination={true}
                   navigation={true}
                   freeMode={true}
                   modules={[Autoplay, Pagination, Navigation, FreeMode]}
                   className='mySwiper swiper-container '
                   autoplay ={{
                    delay: 1500,
                    disableOnInteraction:false,
                   }}
                //    breakpoints={{
                //     1024:{slidesPerView:2}
                //    }}
                    
                   
                   
                 >
                     {
                        courses?.map((course, index) => (
                            <SwiperSlide key={index}  >
                                  <Course_Card  course={course} height={"h-[200px]"}/>
                            </SwiperSlide>
                        ))
                     }
                 </Swiper>
                 
            ) :(
                <p className='text-xl text-richblack-5'>No Course Found</p>
            )
          }
       </div>
       </>
  )
}

export default CourseSlider


