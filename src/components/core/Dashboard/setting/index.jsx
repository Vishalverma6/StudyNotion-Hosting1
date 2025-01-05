

import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Setting = () => {
  return (
    <div className='w-11/12 text-white ml-40 flex flex-col gap-11'>
        <h1 className='  text-2xl font-medium text-richblack-5
        '>
            Edit Profile
        </h1>

        {/* Change Profile Picture */}
        <ChangeProfilePicture/>

        {/* Profile */}
        <EditProfile/>

        {/* Password */}
        <UpdatePassword/>

        {/* Delete Account */}
        <DeleteAccount/>

    </div>
  )
}

export default Setting
