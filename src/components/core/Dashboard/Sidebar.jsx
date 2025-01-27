import React, { useState } from 'react'
import {sidebarLinks} from "../../../data/dashboard-links"
import {logout} from "../../../services/operations/authAPI"
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'


const Sidebar = () => {

    const {user,loading:profileLoading} = useSelector((state) => state.profile);
    const {loading:authLoading}= useSelector((state)=> state.auth);
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const [confirmationModal,setConfirmationModal]= useState(null);

    

    if(authLoading || profileLoading){
        return(
            <div className='spinner mt-10' >
                Loading...
            </div>
        )
    }
  return (
    <div className='text-richblack-200'>
        <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700
        h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>

            {/* Profile section */}
            <div className='flex flex-col'>
                {
                    sidebarLinks.map( (link) => {
                        if(link.type && user.accountType !== link.type) return null;
                        return(
                            <SidebarLink key={link.id} link={link} iconName={link?.icon}/>
                        )

                    })
                }
            </div>

            {/* for line  */}
            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700'></div>

            {/* Settings */}
            <div className='flex flex-col'>
                <SidebarLink 
                link={{name:"Settings",path:"/dashboard/settings"}}
                iconName="VscSettingsGear"
                />
            </div>
            
           
             {/*  confirmation modal
             */}
            <button 
            onClick={() => setConfirmationModal(
                {
                    text1:"Are You sure ?",
                    text2:"You will be logged Out of your Account",
                    btn1Text:"Logout",
                    btn2Text:"Cancel",
                    btn1Handler:()=> dispatch(logout(navigate)),
                    btn2Handler:()=> setConfirmationModal(null), 
                }
            )}
            className='px-8 text-sm font-medium text-richblack-300'
            >
                <div className='flex items-center gap-x-2 text-richblack-300'>
                    <VscSignOut className='text-lg' />
                    <span className='text-richblack-300'>
                        Logout
                    </span>
                </div>
            </button>

            <div className='absolute flex  items-center justify-center  '>
            {confirmationModal && <ConfirmationModal  modalData={confirmationModal}/>}
            </div>
        </div>
     
    </div>
  )
}

export default Sidebar
