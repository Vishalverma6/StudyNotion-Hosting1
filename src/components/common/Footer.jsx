import React from 'react'
import { FaFacebook, FaGoogle, FaHeart, FaTwitter, FaYoutube } from 'react-icons/fa'
import StudyNotionLodo from "../../assets/Logo/Logo-Full-Light.png"

const Footer = () => {
  return (
    <div className='bg-richblack-800'>
        <div className='w-11/12 flex sm:flex-col mx-auto text-[12px] text-richblack-300 items-center px-32 py-10'>
              {/* upper part */}
            <div className='flex w-full md:flex-row sm:flex-col gap-5 lg:border-b-2 lg:border-richblack-700 pb-7 mb-5'>
                {/* right part */}
                <div className='flex ml-10 gap-x-7 justify-between lg:w-[50%]'>
                    <div className='flex flex-col gap-3'>
                        <img src={StudyNotionLodo} 
                        alt='StudyNotionImage'/>
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-white'>Company</h1>
                            <p className='text-richblack-300'>About</p>
                            <p className='text-richblack-300'>Careers</p>
                            <p className='text-richblack-300'>Affillates</p>
                            <div className='flex gap-3'>
                                <FaFacebook/>
                                <FaGoogle/>
                                <FaTwitter/>
                                <FaYoutube/>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-3 lg:w-[30%]'>
                            <h1 className='text-white'>Resources</h1>
                            <div className='flex flex-col gap-3'>
                                <p>Articles</p>
                                <p>Blog</p>
                                <p>Chart sheet</p>
                                <p>Code Challenges</p>
                                <p>Docs</p>
                                <p>Projects</p>
                                <p>Videos</p>
                                <p>Workspaces</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 mt-3'>
                            <h1 className='text-white'>Support</h1>
                            <p>Help center</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 mr-8'>
                        <h1 className='text-white'>Plans</h1>
                        <p>Paid memberships</p>
                        <p>For students</p>
                        <p>Business Solution</p>

                        <div className='flex flex-col gap-3 mt-3'>
                            <h1 className='text-white'>Community</h1>
                            <p>Forums</p>
                            <p>Chapters</p>
                            <p>Events</p>
                        </div>
                    </div>
                </div>

                {/* Left Part */}
                <div className='flex justify-between gap-x-12 lg:border-l-2 pl-7 lg:border-richblack-700'>
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-white'>Subjects</h1>
                        <p>AI</p>
                        <p>Cloud Computing</p>
                        <p>Code Foundations</p>
                        <p>Computer science</p>
                        <p>CyberSecurity</p>
                        <p>Data Analytics</p>
                        <p>Data Science</p>
                        <p>Data Visualization</p>
                        <p>Developer Tools</p>
                        <p>DevOps</p>
                        <p>Game Development</p>
                        <p>IT</p>
                        <p>Machine Learning</p>
                        <p>Math</p>
                        <p>Mobile Development</p>
                        <p>Web Design</p>
                        <p>Web Development</p>
                    </div>

                    <div className='flex flex-col gap-3 mx-8'>
                        <h1 className='text-white'>Languages</h1>
                        <p>Bash</p>
                        <p>C++</p>
                        <p>C#</p>
                        <p>GO</p>
                        <p>HTML & CSS</p>
                        <p>Java</p>
                        <p>JavaScript</p>
                        <p>Kotlin</p>
                        <p>PHP</p>
                        <p>Python</p>
                        <p>R</p>
                        <p>Ruby</p>
                        <p>SQL</p>
                        <p>Swift</p>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h1 className='text-white'>Careers Building</h1>
                        <p>Career Paths</p>
                        <p>Career services</p>
                        <p>Interview prep</p>
                        <p>Professional c</p>
                        <p>-</p>
                        <p>Full Catalog</p>
                        <p>Beta Content</p>
                    </div>
                </div>
            </div>

            {/* lower part */}
            <div className='flex w-full flex-row justify-between items-center mt-14'>
                {/* left side */}
                <div className='flex flex-row gap-3'>
                    <p className='border-r border-richblack-700 px-3'>Privacy Policy</p>
                    <p className='border-r border-richblack-700 px-3'>Cookie Policy</p>
                    <p>Terms</p>
                </div>

                {/* Right part */}
                <div className='flex items-center gap-2'>
                    <p>Made with </p>
                    <FaHeart className='text-red-500'/>
                    <p> CodeHelp &copy; 2023 StudyNotion</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer
