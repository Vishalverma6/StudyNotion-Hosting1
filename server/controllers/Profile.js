
const mongoose = require('mongoose');

const Profile= require("../models/Profile");

const User= require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { populate } = require('../models/Course');
const { convertSecondsToDuration } = require('../utils/secToDuration');
const CourseProgress = require('../models/CourseProgress');
const Course = require('../models/Course');

exports.updateProfile = async(req,res) => {
    try{
        // fetch the data 
        const {dateOfBirth="",about="", contactNumber,gender,image=""}= req.body;

        // get userId
        const id=req.user.id;

        // validation
        if(!contactNumber || !gender ||!id){
            return res.status(400).json({
                success:false,
                message:"All feilds are required",
            });
        }

        // find profile
        const userDetails = await User.findById(id);
        const profileId= userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // update profile
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber;
        
        await profileDetails.save();
        

        // return response
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            profileDetails,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to update profile ,Please try again",
            error:error.message,
        });
    }
}

// delete Account 
// Explore :- How acn we schedule this delete operation
exports.deleteAccount =async(req,res) => {
    try{
        // fetch the id 
        const id = req.user.id;

        console.log("User Id:",id)

        const objectId =new mongoose.Types.ObjectId(id);
        // validation
        const userDetails = await User.findById(objectId);

        console.log("userDetails",userDetails)
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User not Found ",
            });
        }

        // delete profile 
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        // TODO : HW unrolled user from all enrolled courses

        // delete user
        await User.findByIdAndDelete({_id:id});

        // return response
        return res.status(200).json({
            success:true,
            message: "Account deleted Successfully ",
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete account ,Please try again",
            error:error.message,
        });
    }
}

// find all details of a user 
exports.getAllUserDetails= async (req,res) => {
    try{
        // get id 
        const id = req.user.id;

        // validation and get user details 
        const userDetails= await User.findById(id).populate("additionalDetails").exec();
        // return response
        return res.status(200).json({
            success:true,
            message:"User data Fetched Successfully",
            data:userDetails,
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to find user details  ,Please try again",
            error:error.message,
        });
    }
}

// get enrolled Courses
exports.getEnrolledCourses= async(req,res) => {
    try{
        // fetched the user id 
        const userId = req.user.id;

        // find the user deatils and populate the courses
        let userDetails= await User.findOne({_id:userId,})
                                              .populate({
                                                path:"courses",
                                                populate:{
                                                    path: "courseContent",
                                                    populate:{
                                                        path: "subSection"
                                                    }   
                                                }
                                              })
                                              .exec();


        //  calculation for progress bar
        userDetails = userDetails.toObject();
        var subSectionLength = 0;
        for(var i=0; i< userDetails.courses.length; i++){
            let totalDurationInSeconds = 0
            subSectionLength = 0
            for(var j =0 ; j < userDetails.courses[i].courseContent.length; j++){
                totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => 
                acc + parseInt(curr.timeDuration), 0)
                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)
                subSectionLength += userDetails.courses[i].courseContent[j].subSection.length;

            }
            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
            })
            courseProgressCount = courseProgressCount?.completedVideoes?.length
            if(subSectionLength === 0){
                userDetails.courses[i].progressPercentage = 100
            }else{
                // To amke it up to 2 decimal point 
                const multiplier = Math.pow(10,2)
                userDetails.courses[i].progressPercentage = 
                Math.round(
                    (courseProgressCount / subSectionLength) * 100 * multiplier
                )/ multiplier
            }
        }


        // console.log("userDetails",userDetails)

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:`Could not find the user with id : ${userId}`
            });
        }

        return res.status(200).json({
            success:true,
            message:"Enrolled Courses fetched Successfully",
            data:userDetails.courses,
        });
         
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Could not find Enrolled Courses,Please try again",
        });
    }
}

// Update display Picture 
exports.updateDisplayPicture= async(req,res) => {
    try{
        // fetched the diplay picture 
        const displayPicture= req.files.displayPicture;
        const userId= req.user.id;
        console.log("user Id", userId);

        const profileUpload = await uploadImageToCloudinary(displayPicture,
                                                            process.env.FOLDER_NAME,
                                                           
        )
        console.log(profileUpload);
        
        const updatedProfile= await User.findByIdAndUpdate(
                                                {_id:userId},
                                                {image:profileUpload.secure_url},
                                                {new:true}
        );

        return res.status(200).json({
            success:true,
            message:"Profile picture Uploaded successfully",
            data:updatedProfile,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"An error occured while updating profile picture,Please try again",
        });
    }
}

// Instructor Dashboard
exports.instructorDashboard = async(req,res) => {
    try{
        const courseDetails = await Course.find({instructor:req.user.id})

            const courseData = courseDetails.map((course) => {
                const totalStudentsEnrolled= course.studentsEnrolled.length;
                const totalAmountGenerated = totalStudentsEnrolled * course.price;

                // create an new object with additional fields
                const courseDataWithStats = {
                    _id: course.id,
                    courseName: course.courseName,
                    courseDescription:course.courseDescription,
                    totalStudentsEnrolled,
                    totalAmountGenerated,
                }
                return courseDataWithStats

            })

            res.status(200).json({
                success:true,
                courses: courseData,
            })
        
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            message: "Internal server error "
        })
    }

}