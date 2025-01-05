const Section=require("../models/Section");
const Course= require("../models/Course");

exports.createSection= async(req,res) => {
    try{
        // fetch the data from req body
        const {sectionName,courseId}= req.body;

        // validation of data
        if(!sectionName || !courseId){
            return res.status(401).json({
                success:false,
                message:"All fields are required",
            });
        }

        // Create Section
        const newSection= await Section.create({sectionName});

        // update course with section ObjectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
                                                                    {
                                                                        $push:{
                                                                            courseContent:newSection._id,
                                                                        }
                                                                    },
                                                                    {new:true},
                                                                 ).populate({
                                                                    path: "courseContent",
                                                                    populate: {
                                                                        path: "subSection",
                                                                    },
                                                                 }).exec();

        // HW:use populate to replace section/sub-section both in updatedCoursedetails 
        // return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails,
        });
        

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to create Section ,please try again",
            error:error.message,
        });
    }
}

// update section
exports.updateSection = async(req,res) => {
    try{
        // fetch the data
        const {sectionName,sectionId,courseId}= req.body;

        // data validation
        if(!sectionName || !sectionId){
            return res.status(401).json({
                success:false,
                message:"All fields are required",
            });
        }

        // update data 
        const updatedSection = await Section.findByIdAndUpdate(sectionId ,{sectionName},{new:true});

        // find Course
        const updatedCourse = await Course.findById(courseId)
                                             .populate({
                                                path:"courseContent",
                                                populate:{
                                                    path:"subSection",
                                                }
                                             }).exec();

        // return response
        return res.status(200).json({
            success:true,
            message:"Section updated Successfully",
            data:updatedCourse,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to Update Section ,please try again",
            error:error.message,
        });
    }
}

// Delete Section
exports.deleteSection =async(req,res)=> {
    try{
        // get ID -assuming that we are sending ID in parameter
        const {sectionId}= req.params;
        const {courseId}= req.body;
        console.log("sectionId :",sectionId);
        console.log("CourseId  :",courseId);

        // use findbyidanddelete to delete the section
        await Section.findByIdAndDelete(sectionId);

        // TODO(testing) : do we need to delete the entry from course schema 
        
        const updatedCourse= await Course.findById(courseId).populate({
                                                               path:"courseContent",
                                                               populate:{path:"subSection"}
        }).exec();
        // return response
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully",
            updatedCourse,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section ,please try again",
            error:error.message,
        });
    }
}