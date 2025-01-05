import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../common/IconBtn';
import { FiUpload } from 'react-icons/fi';
import { updateDisplayPicture } from '../../../../services/operations/settingsApi';

const ChangeProfilePicture = () => {

    const dispatch= useDispatch();

    const {token}= useSelector((state)=> state.auth);
    const {user}= useSelector((state) => state.profile);
    const fileInputref= useRef(null);

    const [previewSource,setPreviewSource]= useState(null);
    const [loading,setLoading]= useState(false);
    const [imageFile,setImageFile]= useState(null);


    

    const handleClick =()=> {
        fileInputref.current.click()
    }

    const handleFileChange =(e) => {
        const file= e.target.files[0]
        if(file){
            setImageFile(file)
            previewFile(file)
        }

    }
    const previewFile=(file)=> {
        const reader= new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend= ()=> {
            setPreviewSource(reader.result)
        }

    }



    const handleFileUpload=async()=> {
        try{
            console.log("Uploading...")
            setLoading(true)
            const formData= new FormData()
            formData.append("displayPicture",imageFile)

            console.log("formData",formData)
             dispatch(updateDisplayPicture(token,formData)).then(()=> {
                setLoading(false);
             })
          
        }
        catch(error){
            console.log("ERROR MEAASGE - ",error.message)

        }
    }

    useEffect(()=> {
        
        if(imageFile){
            previewFile(imageFile)
        }
        

        // console.log("user redux data", user)
    },[imageFile]);

  return (
    <div className=' w-9/12 flex gap-4  rounded-md border-[1px] border-richblack-700 bg-richblack-800
    text-richblack-5 px-10 py-5'>
       <div>
          <img
           src={previewSource || user?.image}
           alt={`profile-${user?.firstName}`}
           key={user?.image}
           className='aspect-square w-[70px] rounded-full object-cover'
          />
       </div>
       <div className='flex flex-col gap-2'>
          <p>Change Profile Picture</p>
           <div className='flex gap-x-4'>
              <input
               type='file'
               ref={fileInputref}
               onChange={handleFileChange}
               className='hidden'
               accept='image/png, image/gif, image/jpeg, image/jpg'
              />
              <button
              onClick={handleClick}
              disabled={loading}
              className='cursor-pointer rounded-md bg-richblack-700 py-2 px-4
              font-semibold text-richblack-50'
              >
                Select
              </button>
              <IconBtn 
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleFileUpload}
              
              >
                {!loading && (
                    <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconBtn>
           </div>
       </div>
    </div>
  )
}

export default ChangeProfilePicture
