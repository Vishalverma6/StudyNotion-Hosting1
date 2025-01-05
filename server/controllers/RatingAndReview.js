const RatingAndReview= require("../models/RatingAndReview");
const Course = require("../models/Course");
const { mongo, default: mongoose } = require("mongoose");

// createRating 
exports.createRating= async(req,res) => {
    try{
        // get user id 
        const userId= req.user.id;

        // fetched data from req body
        const {rating ,review,courseId} = req.body;

        // check if user is enrolled or not 
        const courseDetails= await Course.findOne(
                                                {_id:courseId,
                                                    studentsEnrolled:{$elemMatch :{$eq:userId}},
                                                });
        
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course",
            });
        }

        // check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                                               user:userId,
                                                               course:courseId,
        });
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user",
            });
        }

        // create ratinf and reviews
        const ratingReview= await RatingAndReview.create({
                                                        rating,review,
                                                        user:userId,
                                                        course:courseId
        });
        
        // update course with this rating/review
        const updatedCourseDetails= await Course.findByIdAndUpdate( courseId,
                                       {
                                        $push:{
                                            ratingAndReviews:ratingReview._id,
                                        }
                                       },
                                       {new:true}, );
        console.log(updatedCourseDetails);
    //   return response
    return res.status(200).json({
        success:true,
        message:"Rating and review created successfully",
        ratingReview,
    });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"An error occured while creating Rating ",
            message:error.message,
        });
    }
}

// getAverageRating 
exports.getAverageRating= async(req,res) => {
    try{
        // get couser ID
        const courseId = req.body.courseId;

        // calculate average rating
        const result = await RatingAndReview.aggregate([
            { 
                $match:{
                   course:new mongoose.Types.ObjectId({courseId}),
            },},
            {
                $group:{
                    _id:null,
                    averageRating: { $avg:"$rating"},
                },
            }
        ])

        // return rating 
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            });
        }

        // if no rating/Review exist 
        return res.status(200).json({
            success:true,
            message:"Average Rating is 0, No rating given till now",
            averageRating:0,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"An error occured whilefinding average rating",
            message:error.message,
        });
    }
}

// getAllRatingAndReviews
exports.getAllRatingReview= async(req,res) => {
    try{
        const allReviews= await RatingAndReview.find({})
                                            .sort({rating:"desc"})
                                            .populate({
                                                path:"user",
                                                select:"firstName lastName email image",
                                            })
                                            .populate({
                                                path:"course",
                                                select:"courseName",
                                            })
                                            .exec();
                                            console.log("All reviews : ",allReviews)
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews,
        });

        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"An error occured while getting all  Rating ",
            message:error.message,
        });
    }
}