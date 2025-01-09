import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/Homepage/HighlightText";
import CTAButton from "../components/core/Homepage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import TimeLineSection from "../components/core/Homepage/TimeLineSection";
import LearningLanguageSection from "../components/core/Homepage/LearningLanguageSection";
import InstructorSection from "../components/core/Homepage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/Homepage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";



function Home(){
    return (
        <div>
            {/* section 1 */}
            <div className="relative mx-auto max-w-maxContent text-white flex flex-col
             w-11/12  items-center justify-between">

               <Link to="/signup">

               <div className="group mt-12 p-1 mx-auto rounded-full bg-richblack-800 font-bold 
               text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:scale-95 hover:drop-shadow-none transition-all duration-200  w-fit">
                  <div className="flex flex-row  items-center gap-x-2 rounded-full px-10
                   py-[5px] transition-all duration-200  group-hover:bg-richblack-900 ">
                     <p>Become a Instructor</p>
                     <FaArrowRight />
                  </div>
               </div>
               </Link>

               <div className="text-center mt-7 text-3xl font-semibold">
                  Empower Your Future With   
                  <HighlightText text={"Coding SKills"}/>
               </div>

               <div className="mt-4 text-center px-24 text-lg font-bold text-richblack-300">
                  with our online coding courses, you can learn at your own pace , from anywhere in the world, and get access to a wealth of resources, including hands on projects,quizess and personlized feedback from instructor.
               </div>

               <div className="flex flex-row gap-5 mt-6">
                  <CTAButton active={true} linkto={"/signup"}>
                     Learn More
                  </CTAButton>

                  <CTAButton active={false} linkto={"/login"}>
                      Book a Demo
                  </CTAButton>
               </div>

               <div className="shadow-blue-200 mx-6 px-24 my-10
                ">
                  <video 
                  muted 
                  loop
                  autoPlay  
                  className="border-r-8 border-b-8 shadow-[20px_20px_rgba(255,255,255)]"
                  >
                     
                     <source src={Banner} type="video/mp4" 
                    />
                  </video>
               </div>

               {/* Code Section 1  */}
               <div>
                  <CodeBlocks 
                   position={"lg:flex-row"} 
                   heading={
                    <div className="text-4xl font-semibold"> 
                        Unlock Your
                        <HighlightText text={"coding potential"}/>
                        with our online courses
                    </div>
                   }
                   subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you." 

                   }

                   ctabtn1={
                    {btnText:"try it yourself",
                     linkto:"/signup",
                     active:true,
                    }
                }

                ctabtn2={
                    {btnText:"Learn more",
                     linkto:"/login",
                     active:false,
                    }
                }

                codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body> 
                   
                   `}
                   codeColor={"text-yellow-25"}

                />
                    
               </div>

               {/* Code Section 2  */}
               <div>
                  <CodeBlocks 
                   position={"lg:flex-row-reverse"} 
                   heading={
                    <div className="text-4xl w-[100%] lg:w-[50%] font-semibold"> 
                        start 
                        <HighlightText text={"coding in seconds"}/>
                    </div>
                   }
                   subheading={"Go ahead, give it a try .Our hands-on learning environment means you'll be writing real code from your very first lession. " 

                   }

                   ctabtn1={
                    {btnText:"try it yourself",
                     linkto:"/signup",
                     active:true,
                    }
                }

                ctabtn2={
                    {btnText:"Learn more",
                     linkto:"/login",
                     active:false,
                    }
                }

                codeblock={`<!DOCTYPE html>\n  <html>\n  <head><title>Example</title>\n </head>\n <body>\n <h1><a href="/">Header </a> \n </h1> 
                   
                   `}
                   codeColor={"text-yellow-25"}
                />
                    
               </div>

               <ExploreMore/>

            </div>

            {/* section 2 */}
            <div className="bg-pure-greys-5 text-richblack-700">
                <div className="homepage_bg h-[310px]">

                    <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">
                    <div className="h-[140px]"></div>
                    <div className="flex gap-7 text-white ">
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="flex items-center gap-3">
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                       

                        <CTAButton active={false} linkto={"/signup"}>
                            <div >
                                Learn more 
                            </div>
                        </CTAButton>

                    </div>

                    </div>
                </div>

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between
                 gap-7">

                    <div className="flex flex-row gap-5 mb-10 mt-[95px]">
                        <div className="text-4xl font-semibold w-[45%]">
                            Get the Skills you need for a 
                            <HighlightText text={"Job that is in demand"}/>
                        </div>

                        <div className="flex flex-col gap-10 w-[40%] items-start">
                        <div className="text-[16px]">
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive 
                            specialist requires more than professional Skills
                        </div>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div>
                                Learn more
                            </div>
                        </CTAButton>

                    </div>
                    </div>

                    
                    <TimeLineSection/>

                    <LearningLanguageSection/>
                </div>

            </div>

            {/* section 3 */}
            <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8
             bg-richblack-900 text-white">

                <InstructorSection/>

                <h2 className="text-center  text-4xl font-semibold mt-10">review from Other Learners</h2>
                {/* TODO: review slider here   */}
                <div className="flex justify-center mb-16">
                   <ReviewSlider />
                </div>
            </div>

            {/* section 4 */}
            <Footer/>
        </div>
    );
}

export default Home;