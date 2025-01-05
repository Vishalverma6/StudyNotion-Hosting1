import RenderSteps from "./RenderSteps";


import React from 'react'

const AddCourse = () => {
   return(
      <>
        <div className="w-full text-white flex flex-col justify-center
         lg:flex-row gap-x-6 ml-3">
            <div className="flex flex-col gap-y-10 ">
                <h1 className="text-3xl font-medium text-richblack-5">Add Course</h1>
                <div className="flex-1">
                   <RenderSteps/>
                </div>
            </div>

            {/* course Upload Tips */}
            <div className=" sticky  top-10 max-w-[400px] hidden xl:block   flex-col gap-y-7 bg-richblack-800 h-fit border-[1px] border-richblack-700
            rounded-md p-5  ">
               <p className="mb-6 text-lg text-richblack-5">⚡ Course Upload Tips</p>
               <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
                  <li>Set the Course Price option or make it free.</li>
                  <li>Standard size for the course thumbnail is 1024x576.</li>
                  <li>Video section controls the course overview video.</li>
                  <li>Course Builder is where you create & organize a course.</li>
                  <li>
                  Add Topics in the Course Builder section to create lessons,
                  quizzes, and assignments.
                  </li>
                  <li>
                  Information from the Additional Data section shows up on the
                  course single page.
                  </li>
                  <li>Make Announcements to notify any important</li>
                  <li>Notes to all enrolled students at once.</li>
               </ul>
            </div>
         </div>
      </>
 )
}

export default AddCourse
