import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import CourseInformation from './CourseInformation/CourseInformation';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourse from './PublishCourse';

const RenderSteps = () => {

   const {step} = useSelector((state)=> state.course)

    const steps= [ 
        {
            id:1,
            title:"Course Information"
        },
        {
            id:2,
            title:"Course Builder",
        },
        {
            id:3,
            title:"Publish",
        }
    ]


  return (
    <>
     

          <div className='relative mb-2 flex w-full justify-center '>
          
         {
            steps.map((item)=> (
               <>
                  <div key={item.id}
                    className=' flex flex-col items-center '> 

                        <button
                            className={`flex cursor-default aspect-square w-[34px] items-center justify-center rounded-full border-[1px]
                            ${step === item.id 
                            ? "bg-yellow-900 border  border-yellow-50 text-yellow-50"
                            :" bg-richblack-800 border-richblack-700 text-richblack-300"}
                            ${step > item.id && "bg-yellow-50 text-yellow-50"} `}
                        >
                              {
                                  step> item.id ?(<FaCheck className=' font-bold text-richblack-900'/>): (item.id)
                              }
                        </button>
                      
                    </div>
                      {/*  Add Code for the dashes between the labels  */}
                        {
                          item.id !== steps.length && (
                            <div
                            className={` w-[33%] border-b-2 border-dashed h-[calc(34px/2)] 
                              ${step >item.id ? "border-yellow-50" : "border-richblack-500"}`}
                            >

                            </div>
                          )
                        }
                  </>
            ))
         }  
      </div>

      
      <div className=' relative flex gap-4   mb-14 w-full select-none justify-between'>
         {
            steps.map((item)=> (
                <div
                 className="flex min-w-[130px]  flex-col items-center "
                key={item.id}>
                <p
                 className={`text-sm mr-[-30px] ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                 }`}
                >
                  {item.title}</p>
             </div>
              
            ))
         }
      </div>      

      

     <div className='mt-10 '>
       {step ==1 && <CourseInformation/>}
       {step == 2 && <CourseBuilderForm/>}
       {step ==3 && <PublishCourse/>} 
     </div>
      
    </>
  )
}

export default RenderSteps
