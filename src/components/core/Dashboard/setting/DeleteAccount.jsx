import React from 'react'
import toast from 'react-hot-toast'
import { FiTrash2 } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProfile } from '../../../../services/operations/settingsApi'
import { useNavigate } from 'react-router-dom'

const DeleteAccount = () => {
    
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const {token}= useSelector((state)=> state.auth);
    async function handleDeleteAccount(){
        try{
            dispatch(deleteProfile(token,navigate))
        }
        catch(error){
            console.log("ERROR MESSAGE-",error.message)
            toast.error("Your Account Could not Deleted,Please Try later")
        }
    }
  return (
    <>
      <div className='w-9/12 flex flex-col gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-7 px-10'>
        <div className='flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700
        '>
            <FiTrash2 className='text-3xl text-pink-200'/>
        </div>
        <div className='flex flex-col space-y-2'>
            <h2 className='text-lg font-semibold text-richblack-5'>
                Delete Account
            </h2>
            <div className="w-3/5 text-pink-25">
                <p>Would you like to delete account?</p>
                <p>
                  This account may contain Paid Courses. Deleting your account is
                   permanent and will remove all the contain associated with it.
                  </p>
            </div>
            <button
            type='submit'
            className='w-fit cursor-pointer italic text-pink-300 bg-pink-800 rounded-md py-2 px-3'
            onClick={handleDeleteAccount}
            >
                 I want to delete my account.
            </button>
        </div>
      </div>
    </>
  )
}

export default DeleteAccount
