const express= require("express");
const router= express.Router();

const { auth, isInstructor, isAdmin, isStudent } = require("../middlewares/auth");
const { createCourse, getCourseDetails, getAllCourses, editCourse, deleteCourse, getInstructorCourses, getFullCoursedetails, getFullCourseDetails } = require("../controllers/Course");
const { createSection, updateSection, deleteSection } = require("../controllers/Section");
const { createSubSection, updateSubSection, deleteSubsection } = require("../controllers/Subsection");
const { createCategory, showAllCategories, categoryPageDetails } = require("../controllers/Category");
const { createRating, getAverageRating, getAllRatingReview } = require("../controllers/RatingAndReview");

const {updateCourseProgress} = require("../controllers/CourseProgress");


// Courses can Only Created by instructor 
router.post("/createCourse",auth,isInstructor,createCourse);

// editing a course
router.post("/editCourse",auth,isInstructor,editCourse)
// Add a section to a course
router.post("/addSection",auth,isInstructor,createSection);

// Routes for Section updates
router.post("/updateSection",auth,isInstructor,updateSection);

// routes for delete a section
router.delete("/deleteSection/:sectionId",auth,isInstructor,deleteSection);

// add a subsection
router.post("/addSubSection",auth,isInstructor,createSubSection);

// update a subsection
router.post("/updateSubSection",auth,isInstructor,updateSubSection);

// delete a subsection
router.delete("/deleteSubSection",auth,isInstructor,deleteSubsection);

// Get course details
router.post("/getCourseDetails",getCourseDetails);

// Get All course Details
router.get("/getAllCourses",getAllCourses);

// delete course
router.delete("/deleteCourse",deleteCourse);

// Get all courses under a Specific Instructor
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses)
router.post("/getFullCourseDetails",auth, getFullCourseDetails)

// update Course Progress 
router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress)

//        Ctegory Routes (Only by Admin)

// category can only be Created by Admin
// TODO: Put IsAdmin Middleware here

router.post("/createCategory",auth,isAdmin, createCategory);
router.get("/showAllCategories",showAllCategories);
router.post("/getCategoryPageDetails",categoryPageDetails);



//    Rating and reviews 

router.post("/createRating",auth,isStudent,createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getReviews",getAllRatingReview);

module.exports= router;


