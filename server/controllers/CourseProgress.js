const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");



exports.updateCourseProgress = async(req,res) => {
    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;
    try{
        // check if the subsection is valid 
        const subSection = await SubSection.findById(subSectionId);

        // validation
        if(!subSection){
            return res.status(404).json({
                success:false,
                message: "section is not valid "
            })
        }

        // check for old Entry
        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId
        })
        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message: "Course does not exist in Course Progress",
            })
        }
        else{
            // check for re-completing Video/subSection
            if(courseProgress.completedVideoes.includes(subSectionId)){
                return res.status(400).json({
                    message: "Video Already Marked as Completed",
                })
            }

            // push into completed video
            courseProgress.completedVideoes.push(subSectionId);
        }
        await courseProgress.save();
        return res.status(200).json({
            success:true,
            messsage:"Course Progress Upadted Successfully",
        })
    }
    catch(error){
        console.error(error);
        return res.status(400).json({
            success:false,
            message: "Internal server Error ",
        });
    }
}