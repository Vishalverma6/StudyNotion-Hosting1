const SubSection=require("../models/SubSection");
const Section= require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

// create a Subsection
exports.createSubSection = async(req,res) => {
    try{
        // fetch data from req body
        const {sectionId,title,description,
            
        }= req.body;
        
        // extract file /video
        const video= req.files.video;

        // validation
        if(!sectionId || !title|| !description || 
            
            !video){
            return res.status(401).json({
                success:false,
                message:"All fields are required ",
            });
        }

        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        console.log("uploadDetails",uploadDetails)
        // create a sub-section
        const subSectiondetails = await SubSection.create({
            title:title,
            timeDuration:`${uploadDetails?.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url,
        });

        // update section with this sub section Objectid
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                                {
                                                                    $push:{
                                                                        subSection:subSectiondetails._id
                                                                    },
                                                                },
                                                                {new:true},      
                                                               ).populate("subSection").exec();
        // return response
        return res.status(200).json({
            success:true,
            message:"sub section Created successfully ",
            data:updatedSection,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Enable to create a subsection",
            error:error.message,
        });
    }
}

// HW : updateSubSection
exports.updateSubSection = async(req,res) => {
    try{
        // fetch the data from req body
        const {sectionId,subSectionId,title,description
            // ,timeDuration
        }= req.body;


        const subSection= await SubSection.findById(subSectionId);

        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"SubSection not Found",
            });
        }


        // validation  
        
        // if(
        //     !sectionId ||
        //      !title ||
        //      !description 
        //     // || !timeDuration 
        //     || !req.files 
        //     || !req.files.video
        // ){
        //     return res.status(401).json({
        //         success:false,   
        //         message:"All fields are required ",
                
        //     });
        // }

        if(title !== undefined){
            subSection.title= title
        }
        
        if(description !== undefined){
            subSection.description= description
        }
        
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary(
              video,
              process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
          }
      
          await subSection.save()
        
        // const video = req.files.video;

        // console.log("Vishal vermna")
        //  // upload video to cloudinary
        //  const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

    
        // // update subsection
        // const updatedDetails= await SubSection.findByIdAndUpdate(subSection._id,
        //                                                           {title:title,
        //                                                             description:description,
        //                                                             // timeDuration:timeDuration,
        //                                                             videoUrl:uploadDetails.secure_url,
        //                                                           },
        //                                                           {new:true},
        // );

        // if(!updatedDetails){
        //     return res.status(401).json({
        //         success:false,
        //         message:"subsection Id is not found "
        //     })
        // }


        const updatedSection= await Section.findById(sectionId).populate("subSection");
        // return response
        return res.status(200).json({
            success:true,
            message:"Subsection updated successfully",
            data:updatedSection,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to update Subsection",
        });
    }
}

// HW: deleteSubSection
exports.deleteSubsection= async(req,res)=> {
    try{
        const {subSectionId,sectionId}= req.body;
        await Section.findByIdAndUpdate({_id:sectionId},
                                       {$pull:{subSection:subSectionId},},
                                       {new:true},
        );

        // delete the subsection
        const deleteSubSection= await SubSection.findByIdAndDelete({_id:subSectionId});

        if(!deleteSubSection){
            return res.status(404).json({
                success:false,
                message:"Subsection not found ",
            });
        }

        const updatedSection= await Section.findById(sectionId).populate("subSection");
        // return response
        return res.status(200).json({
            success:true,
            data:updatedSection,
            message:"Subsection deleted Successfully",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"An error occured while deleting subsection",
        });
    }
}