import React, { use, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { FaRegEdit } from 'react-icons/fa';

const MyProfile = () => {
    
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

    
    
  return (
    <div className='flex w-11/12  flex-col gap-10 text-richblack-5 items-center'>
        <h1 className='text-3xl mr-auto ml-36 font-semibold'>
            My Profile
        </h1>

        {/* Section 1  */}
       <div className='flex w-9/12 items-center justify-between
       bg-richblack-800 p-6 px-10 rounded-md border  border-richblack-800'>
            <div className='flex gap-x-4 items-center'>
                <img
                src={`${user?.image}`}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-[70px] rounded-full object-cover"
                />
                <div className='flex flex-col gap-1'>
                    <p className='text-richblack-5 capitalize'>{user?.firstName + " " + user?.lastName} </p>
                    <p className='text-richblack-300'>{user?.email}</p>
                </div>
            </div>
            <div className='flex '>
            <IconBtn
             
                text="Edit"
                onclick={ () => {
                    navigate("/dashboard/settings")
                }}
                
                > <FaRegEdit className='' />
                    </IconBtn>
                    
            </div>           
       </div>

       {/* section 2 */}
       <div className='flex w-9/12 items-center justify-between
       bg-richblack-800 p-6 px-10 rounded-md border  border-richblack-800'>
          <div className='flex flex-col gap-y-7'>
             <p>About</p>
             <p className='text-richblack-300'>{user?.additionalDetails?.about ?? "write something about Yourself"}</p>
          </div>

           {/* Edit icon bhhi add karna hai HW */}
           <div className='mt-[-40px]'>
           <IconBtn 
           text="Edit"
             onclick={()=> {
                navigate("/dashboard/settings")
             }}>
                <FaRegEdit className='' />
                </IconBtn>
           </div>
          
       </div>

       {/* section 3 */}
       <div className='flex w-9/12 justify-between
       bg-richblack-800 p-6 px-10 rounded-md border  border-richblack-800'>
          
          <div className='flex  flex-col gap-10'>
                <div >
                    Personal Details
                </div>
                    

               <div className='flex items-center gap-x-32'>
                 <div className='flex flex-col gap-5'>
                        <div >
                                <p className='text-richblack-300'>First Name</p>
                                <p className=' capitalize'>{user?.firstName}</p>
                            </div>

                            <div>
                                <p className='text-richblack-300'>Email</p>
                                <p>{user?.email}</p>
                            </div>

                            <div>
                                <p className='text-richblack-300'>Gender</p>
                                <p>{user?.additionalDetails?.gender ?? "Add your Gender"}</p>
                            </div>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-1 '>
                                <p className='text-richblack-300'>Last Name</p>
                                <p className=' capitalize'>{user?.lastName}</p>
                            </div>
                            <div>
                                <p className='text-richblack-300'>Phone Number</p>
                                <p>{user?.additionalDetails?.contactNumber ?? "add Phone number"}</p>
                            </div>
                            <div>
                                <p className='text-richblack-300'>Date of Birth</p>
                                <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date of birth"}</p>
                            </div>

                    </div>
               </div>

                

                    
                
          </div>
            

          {/* Edit icon bhhi add karna hai HW */}
          <div className='mb-auto'>
           <IconBtn 
           text="Edit"
             onclick={()=> {
                navigate("/dashboard/settings")
             }}>
                <FaRegEdit className='' />
                </IconBtn>
           </div>
       </div>

    </div>
  )
}

export default MyProfile
