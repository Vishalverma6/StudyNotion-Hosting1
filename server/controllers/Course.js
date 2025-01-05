const Course = require("../models/Course");
const Category= require("../models/Category");
const User =require("../models/User");
const {uploadImageToCloudinary}= require("../utils/imageUploader");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");
require("dotenv").config();


// create Course handler function
exports.createCourse= async(req,res) => {
    try{

        const userId = req.user.id;

        // fetch the data from req body
        let {courseName,
            courseDescription,
            whatYouWillLearn,
            price ,
            category,
            status,
            instructions,
            tag
        } = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn 
            || !price ||!category 
            || !thumbnail
            || !tag
        ){
            return res.status(401).json({
                success:false,
                message:"All fields are required",
            });
        }

        if(!status || status===undefined){
            status="Draft";
        }

        // check for instructor
        
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Deatils", instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor Details not Found",
            });
        }

        // check given category is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category Deatils is not found",
            });
        }

        // Upload Image to cloudinary
        const thumbnailImage= await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        console.log("Thumbnail",thumbnailImage)
        // create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            category:categoryDetails._id,
            status:status,
            tag:tag,
            thumbnail:thumbnailImage.secure_url,
            instructions:instructions,
        });

        // add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {$push: {
                courses:newCourse._id,
            }},
            {new:true},
        )

        // Add the new course to the Categories 
        const updateCategory= await Category.findByIdAndUpdate(
            {_id:categoryDetails._id,},
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            {new: true}
          );
        console.log("Category details: ",updateCategory);

        // return the response
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Course creation Failed, please try again",
        });
    }
}

exports.editCourse = async(req,res) => {
    try{
        const {courseId} = req.body;
        const updates = req.body;
        const course = await Course.findById(courseId)

        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course Not found",
            })
        }

        // if thumbnail Image is found,update it
        if(req.files){
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
                  thumbnail,
                  process.env.FOLDER_NAME,
            )
            course.thumbnail = thumbnailImage.secure_url
        }

        // updates only the fields that are present in the request body
        for (const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key === "tag" || key === "instructions"){
                    course[key] = JSON.parse(updates[key])
                } else{
                    course[key] = updates[key]
                }
            }
        }
            await course.save();

            const updatedCourse = await Course.findOne({ 
                _id: courseId
            })
            .populate({
                path: "instructor",
                populate:{
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate:{
                    path: "subSection",
                }
            })
            .exec()

            return res.status(200).json({
                success:true,
                message:"Course Updated Successfully",
                data: updatedCourse,
            })
        }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server error, edit course failed",
            error: error.message,
        })
    }
}

// get allcourses handler function
exports.getAllCourses = async (req,res) => {
    try{
        // Todo : change the below statement incrementally.
        const allcourses= await Course.find( {});

                return res.status(200).json({
                    success:true,
                    message:"Data for all courses fetched successfully",
                    data:allcourses,
                });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot Fetch courses details,please try again",
            error:error.message,
        });

    }
}

// get CourseDetails
exports.getCourseDetails= async(req,res)=> {
    try{
        // get id 
        const {courseId}= req.body;

        // find course details
        const courseDetails= await Course.findOne(
                                               {_id:courseId})
                                               .populate(
                                                {
                                                    path:"instructor",
                                                    populate:{
                                                        path:"additionalDetails",
                                                    },
                                                }
                                               )
                                               .populate("category")
                                               .populate("ratingAndReviews")
                                               .populate({
                                                 path: "courseContent",
                                                 populate: "subSection",
                                                 select: "videoUrl"
                                               })
                                               .exec();

    // validation
    if(!courseDetails){
        return res.status(400).json({
            success:false,
            message:`Could not found the course with the ${courseId}`,
        });
    }


    let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)


    // return response
    return res.status(200).json({
        success:true,
        message:"Course Details found successfully",
        data:{
            courseDetails,
            totalDuration,
        }
    });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Could not find course Details",
        });
    }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async(req,res) => {
    try{

        const instructorId = req.user.id;
        
        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
            instructor: instructorId,
        })
        .populate({
            path:"courseContent",
            populate:{
                path: "subSection",
            }
        })
        .sort({createdAt: -1}).exec()

        let totalDurationInSeconds = 0
        instructorCourses.map((course) => course.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                
                totalDurationInSeconds += timeDurationInSeconds

                
            })
        }))
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

         console.log("Total Duration",totalDuration)

        // return the instructor'S course
        res.status(200).json({
            success:true,
            message:"Instructor courses Fetched Suceesfully",
            data: {
                instructorCourses,
                totalDuration,
            }
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Failed to retrieve instructor courses",
            error:error.message,
        })
    }
}


// delete Course(Karna hai baad mein)
exports.deleteCourse = async(req,res)=> {
    try{
        const {courseId} = req.body;
        
        // find the course
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                success:false,
                message: "Course not found",
            })
        }

        // Unenrolled students from the course
        const studentsEnrolled = course.studentsEnrolled
        for (const studentId of studentsEnrolled){
            await User.findByIdAndUpdate(studentId, {
                $pull: {courses: courseId},
            })
        }

        // Delete sections and sub sections
        const courseSections = course.courseContent
        for(const sectionId of courseSections){
            // delete subsections of the section
            const section = await Section.findById(sectionId)
            if(sectionId){
                const subSections = section.subSection
                for(const subSectionId of subSections){
                    await SubSection.findByIdAndUpdate(subSectionId)
                }
            }

            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }

        // Delete the course
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success:true,
            message: "Course Delted successfully",
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }

}

// fetchinf full courses details 
exports.getFullCourseDetails = async(req,res)=> {
    try{
        const {courseId} = req.body;
        const userId = req.user.id;
        const courseDetails = await Course.findOne({
            _id: courseId,
        })
        .populate({
            path: "instructor",
            populate:{
                path: "additionalDetails"
            },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate:{
                path: "subSection"
            },
        })
        .exec();

    let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId:userId,
    })

    console.log("courseProgressCount :",courseProgressCount);

        // console.log("CourseDeatisl",courseDetails)

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:`Could not  course with id: ${courseId}`
            })
        }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds

                
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        console.log("Total Duration",totalDuration)

        return res.status(200).json({
            success:true,
            message:"successfylly found all details ",
            data:{
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount ?.completedVideoes 
                ? courseProgressCount?.completedVideoes : []
                
            },
        })

        
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message:error.message
        })
    }
}