import toast from "react-hot-toast";
import { courseEndpoints, ratingsEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";


const {
    GET_ALL_COURSE_API,
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
    DELETE_COURSE_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    LECTURE_COMPLETION_API,
} = courseEndpoints;

const {CREATE_RATING_API}= ratingsEndpoints;


// for getting All Courses at a time 
export const getAllCourses = async()=> {
    const toastId = toast.loading("Loading...")
    let result = []
    try{
        const response = await apiConnector("GET",GET_ALL_COURSE_API)
        if(!response.data.success){
            throw new Error (response?.data?.message || "Could not fetch all courses")
        }
        result = response?.data?.data
        toast.success(response?.data?.message || "Successfully fetched the courses")

    }
    catch(error){
        console.log("GET_ALL_COURSE_API API ERROR .....",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}


// fetching the Course Details 
export const fetchCourseDetails = async(courseId)=> {
    const toastId= toast.loading("Loading....")

    let result= null
    try{
        const response= await apiConnector("POST", COURSE_DETAILS_API,{
            courseId,
        })
        console.log("COURSE_DETAILS_API API RESPONSE",response)

        if(!response?.data?.success){
            throw new Error(response.data.message)
        }
        result= response?.data
        toast.success(response?.data?.message)
    }
    catch(error){
        console.log("COURSE_DETAILS_API API ERROR....",error)
        result= error.response.data
    }

    toast.dismiss(toastId)
    return result
}



// fetching the Available course Categories
export const fetchCourseCategories= async()=> {
    const toastId= toast.loading("Loading...")
    let result= []
    try{
        const response= await apiConnector("GET",COURSE_CATEGORIES_API)

        console.log("Response:",response)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories")
          }
        //   toast.success(response?.data?.message || "Course Category fetched Successfully")

          result= response?.data?.allcategories
        //   console.log("Result:",result)
    }
    catch(error){
        console.log("COURSE_CATEGORIES_API API ERROR.....",error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    return result

}


// Add the course
export const addCourseDetails= async(data,token) => {
    let result =null;
    const toastId = toast.loading("Loading");
    try{
        const response = await apiConnector("POST",CREATE_COURSE_API,data,{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        console.log("CREATE_COURSE_API API RESPONSE....",response)
        if(!response?.data?.success){
            throw new Error("Could not Add Course Details")
        }
        toast.success(response?.data?.message || "Course Details added Succesfully")
        result=response?.data?.data;
    }
     catch(error){
        console.log("CREATE_COURSE_API API ERROR...",error);
        toast.error(error?.response?.data?.message)
     }
     toast.dismiss(toastId);
     return result
}


// Edit Course Details 
export const editCourseDetails= async(data,token) => {
    let result= null
    const toastId= toast.loading("Loading....")
    try{
        const response = await apiConnector("POST",EDIT_COURSE_API,data,{
            "Content-Type": "multipart/form-data",
            Authorization:`Bearer ${token}`
        })

        console.log("EDIT_COURSE_API API RESPONSE....",response);
        if(!response?.data?.success){
            throw new Error("Could not Update Course Details")
        }

        toast.success("Course Details Updated Successfully")
        result = response?.data?.data
    }
    catch(error){
        console.log("EDIT_COURSE_API Api ERROR ....",error);
        toast.error(error.message)
    }

    toast.dismiss(toastId);
    return result 

}

// Delete A course
export const deleteCourse = async(data,token) => {
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("DELETE",DELETE_COURSE_API,data,{
            Authorization: `Bearer ${token}`
        })
        console.log("DELETE COURSE API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Course")
          }
          toast.success(response?.data?.message || "Course Deleted")
    }
    catch(error){
        console.log("DELETE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}

// Create Section 
export const createSection= async(data,token) => {
    const toastId= toast.loading("Loading...");
    let result =null;
    try{
        const response= await apiConnector("POST",CREATE_SECTION_API,data,{
            // "Content-Type": "multipart/formData",
            Authorization : `Bearer ${token}`,         
        })

        console.log("CREATE_SECTION_API RESPONSE.....",response);


        if(!response?.data?.success){
            throw new Error("Could not Create Section")
        }
        toast.success(response?.data?.message || "Course Section Created");
        result = response?.data?.updatedCourseDetails
    }
    catch(error){
        console.log("CREATE_SECTION_API ERROR.....",error);
        toast.error(error?.response?.data?.message || error.message);
    }

    toast.dismiss(toastId);
    return result;
}



// Update Section
export const updateSection= async(data,token) => {
    const toastId = toast.loading("Loading...");
    let result= [];
    try{
        const response= await apiConnector("POST",UPDATE_SECTION_API,data,{
            
            Authorization:`Bearer ${token}`,
        })

        
        console.log("UPDATE_SECTION_API REPONSE.....",response);
        if(!response?.data?.success){
            throw new Error("Could not Update Section")
        }

        toast.success(response?.data?.message || "Course section Updated");
        result = response?.data?.data;
        console.log("RESULT",result);
    }
    catch(error){
        console.log("UPDATE_SECTION_API ERROR.....",error);
        toast.error(error?.response?.data?.message || error.message);
    }
    toast.dismiss(toastId);
    return result;
}


// Delete Section
export const deleteSection= async(sectionId,token ,data) => {
    const toastId = toast.loading("Loading...");
    let result= null;
    try{
        const response = await apiConnector("DELETE",`${DELETE_SECTION_API}/${sectionId}`,data,{
            Authorization:`Bearer ${token}`,
        })
        console.log("DELETE_SECTION_API RESPONSE .....",response);
        if(!response?.data?.success){
            throw new Error("Could not Delete Section")
        }
        toast.success(response?.data?.message || "Section deleted Successfully");
        result= response?.data?.updatedCourse;
    }
    catch(error){
        console.log("DELETE_SECTION_API ERROR....",error);
        toast.error(error?.response?.data?.message || error?.message);
    }
    toast.dismiss(toastId);
    return result;

}

// Create SubSection
export const createSubSection = async(data,token) => {
    const toastId= toast.loading("Loading...");
    let result= null;

    console.log("TOKEN IN api ",token)
    try{

        const response = await apiConnector("POST",CREATE_SUBSECTION_API,data,{
            "Content-Type": "multipart/form-data",
            Authorization:`Bearer ${token}`,
            
        })
        console.log("CREATE_SUBSECTION_API,RESPONSE....",response);
        if(!response?.data?.success){
            throw new Error("SubSection Could not created");
        }
        toast.success(response?.data?.message ||"Subsection created successfully");
        result= response?.data?.data;
    }
    catch(error){
        console.log("CREATE_SUBSECTION_API,ERROR....",error);
        toast.error(error?.response?.data?.message ||error?.message)
        
        
    }

    toast.dismiss(toastId);
    return result;
}

// Update Subsection
export const updateSubSection =async(data, token) => {
    const toastId= toast.loading("loading...");
    let result= null;
    try{
        const response= await apiConnector("POST",UPDATE_SUBSECTION_API,data,{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE_SUBSECTION_API RESPONSE",response);
    
        if(!response?.data?.success){
            throw new Error("SubSection Could not Updated");
        }
        toast.success(response?.data?.message ||"Subsection Updated successfully");
        result= response?.data?.data;
    }
    catch(error){
        console.log("UPDATE_SUBSECTION_API ERROR....",error)
        toast.error(error?.response?.data?.message || error?.message);
    }
    toast.dismiss(toastId)
    return result;
}

// delete Subsection
export const deleteSubSection =async(data,token)=> {
    const toastId = toast.loading("Loading...");
    let result= null;
    try{
        const response= await apiConnector("DELETE",DELETE_SUBSECTION_API,data,{
            Authorization: `Bearer ${token}`
        })
        console.log("DELETE_SUBSECTION_API RESPONSE...",response);
        if(!response?.data?.success){
            throw new Error("Could not delete SubSection ")
        }
        toast.success(response?.data?.message || "SubSection Deleted Successfully");
        result= response?.data?.data;
    }
    catch(error){
        console.log("DELETE_SUBSECTION_API ERROR....",error);
        toast.error(error?.response?.data?.message || error?.message);
    }
    toast.dismiss(toastId);
    return result;
}

// fetching all the courses under a specific instructor
export const fetchInstructorCourses = async(token) => {
    let result =[];
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("GET",GET_ALL_INSTRUCTOR_COURSES_API,null,{
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_ALL_INSTRUCTOR_COURSES_API RESPONSE....",response);
        if(!response?.data?.success){
            throw new Error("Could Not Fetch Instructor Courses");
        }

        // toast.success(response?.data?.message || "All courses of Instructor fetch Successfully");
        result = response?.data?.data;
    }
    catch(error){
        console.log("GET_ALL_INSTRUCTOR_COURSES_API ERROR....",error);
        toast.error( error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const getFullDetailsOfCourse =async(courseId,token)=> {
    const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result=[];
  try{
    const response = await apiConnector("POST",
                GET_FULL_COURSE_DETAILS_AUTHENTICATED,
                 {courseId},
                 {Authorization: `Bearer ${token}`}
                )

     console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

     if (!response.data.success) {
            throw new Error(response.data.message)
      }
      result= response?.data?.data
  }
  catch(error){
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
}

// mark a lecture as complete
export const markLectureAsComplete = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading");
    try{
        const response = await apiConnector("POST",LECTURE_COMPLETION_API, data, {
            Authorization: `Bearer ${token}`,
        })

        console.log("LECTURE_COMPLETION_API RESPONSE...",response);

        if(!response.data.success){
            throw new Error(response?.data?.message)
        }

        toast.success("Lecture Completed");
        result = true
    }
    catch(error){
        console.log("LECTURE_COMPLETION_API ERROR...",error);
        toast.error(error?.response?.data?.message || error.message );
        result= false
    }
    toast.dismiss(toastId)
    return result;
}

// create a rating for course
export const createRating = async(data,token)=> {
    const toastId = toast.loading("Loading...")
    let success = false
    try{
        const response = await apiConnector("POST",CREATE_RATING_API,  data,{
            Authorization: `Bearer ${token}`
        })

        console.log("CREATE RATING API RESPONSE............", response)

        if (!response?.data?.success) {
          throw new Error("Could Not Create Rating")
        }

        toast.success(response?.data?.message || "Rating Created")
        success = true;
         
    }
         
    catch(error){
        success = false
        console.log("CREATE RATING API ERROR............", error)
        toast.error(error?.response?.data?.message || error.message)
    }
    toast.dismiss(toastId)
    return success
}

