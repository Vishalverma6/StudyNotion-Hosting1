import toast from "react-hot-toast";
import { settingsEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI";

const {UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
}= settingsEndpoints

export function updateDisplayPicture(token,formData){
    
    return async (dispatch) => {
        const toastId= toast.loading("Loading...")
        try{
            const response= await apiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,
                                               formData,{
                                               "Content-Type": "multipart/form-data",
                                                Authorization :`Bearer ${token}`,                
            })

            console.log("UPDATE_DISPLAY_PICTURE_API RESPONSE....",response);
            if(!response?.data.success){
                throw new Error (response.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            
           
            dispatch(setUser(response?.data?.data))

            
        }
        catch(error){
            console.log("UPDATE_DISPLAY_PICTURE_API ERROR....",error);
            console.log("Could not Update Display Picture")
        }
        toast.dismiss(toastId)
    }

}

export function updateProfile(token,formData){
    return async(dispatch) =>{
        const toastId= toast.loading("Loading..")
        try{
            const response= await apiConnector("PUT",UPDATE_PROFILE_API,formData,{
                Authorization: `Bearer ${token}`,
            })
            console.log("UPDATE_PROFILE_API RESPONSE...",response);

            if(!response.data.success){
                throw new Error (response.data.message)
            }
            // const userImage= response.data.profileDetails.image
            // ? response.data.profileDetails.image
            // : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.profileDetails.firstName} ${response.data.profileDetails.lastName}`

            dispatch(setUser(response.data.profileDetails))
            console.log("response.data.profileDetails",response.data.profileDetails)
            toast.success("Profile Updated Successfully")
           


        }
        catch(error){
            console.log("UPDATE_PROFILE_API ERROR....",error);
            toast.error("Could not Update Profile")
        }
        toast.dismiss(toastId)
    }

}

export async function changePasssword(token,formData){
    const toastId= toast.loading("Loading");
    try{
        const response= await apiConnector("POST",CHANGE_PASSWORD_API,formData,{
            Authorization: `Bearer ${token}`,
        })

        console.log("CHANGE_PASSWORD_API API RESPONSE...",response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Password Changed successfully")
    }
    catch(error){
        console.log("CHANGE_PASSWORD_API API Error....",error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}

export function deleteProfile(token,navigate){
    return async(dispatch)=>{
        const toastId= toast.loading("Loading...");
        try{
            const response= await apiConnector("DELETE",DELETE_PROFILE_API,null,{
                Authorization:`Bearer ${token}`
            })
            console.log("DELETE_PROFILE_API API RESPONSE....",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Profile Deleted Successfully")
            dispatch(logout(navigate))
           
        }
        catch(error){
            console.log("DELETE_PROFILE_API API ERROR....",error)
            toast.error( error?.response?.data?.message || "Could Not Delete Profile")
        }
        toast.dismiss(toastId);
    }
}