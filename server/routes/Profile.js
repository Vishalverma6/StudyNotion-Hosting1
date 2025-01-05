const express= require("express");
const router= express.Router();

const { updateProfile,
     deleteAccount,
     getAllUserDetails,
     getEnrolledCourses,
     updateDisplayPicture,
     instructorDashboard,
     } = require("../controllers/Profile");

const { auth, isInstructor } = require("../middlewares/auth");


// Profile Routes
router.put("/updateProfile",auth, updateProfile);
router.delete("/deleteProfile",auth,deleteAccount);
router.get("/getUserDetails",auth,getAllUserDetails);

// get Enrolled Courses
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);
router.get("/instructorDashboard",auth,isInstructor, instructorDashboard)


module.exports= router