const mongoose = require("mongoose");

const Category= require("../models/Category");
function getRandomInt(max){
    return Math.floor(Math.random()*max)
}


// create catehory ka Handler function
exports.createCategory =async(req,res) => {
    try{
        // fetch the data from req body
        const {name, description} = req.body;

        // validate the data 
        if(!name || !description){
            return res.status(401).json({
                success:false,
                message:"All fields are required",
            });
        }

        // create entry in DB
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log(categoryDetails);

        // return response
        return res.status(200).json({
            success:true,
            message:"Category Created Successfully",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Category is not Created ,Please try again",
        });
    }
}

// get Allcatgory handler function

exports.showAllCategories= async(req,res) => {
    try{
        const allcategories = await Category.find( {},{name:true, description:true});
        res.status(200).json({
            success:true,
            message:"All category returned successfully",
            allcategories,
        });
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"Something Went Wrong",
            message:error.message,
        });
    }
}

// categoryPageDetails
exports.categoryPageDetails= async(req,res)=> {
    try{
        // get categoryId
        const {categoryId}= req.body;

        // console.log("categoryId",categoryId)
        // get courses for specified categoryId
        const selectedCategory= await Category.findById(categoryId)
                                                     .populate({
                                                        path: "courses",
                                                        match: {status: "Published"},
                                                        populate: {
                                                            path: "ratingAndReviews"
                                                        }
                                                     })
                                                     .exec();

    //   console.log("selectedCategory :",selectedCategory)
        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data Not Found",
            });
        }

        // handle the case when there are no courses
        if(selectedCategory.courses.length === 0){
            console.log("No courses found for the selected category.")
            return res.status(404).json({
                success:false,
                message: "No courses found for the selected category. "
            })
        }

        // get courses for different categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId},
        })
        // console.log("categoriesExceptSelected",categoriesExceptSelected)

        // categories except selected with courses 
        const categoriesWithCourses = categoriesExceptSelected.filter(
            (category) => category.courses && category.courses.length > 0 );

            // console.log("categoriesWithCourses",categoriesWithCourses)
            // if (categoriesWithCourses.length === 0) {
            //     return res.status(404).json({
            //         success: false,
            //         message: "No other categories with courses found.",
            //     });
            // }
            
        

        let differentCategory= await Category.findOne(
            categoriesWithCourses[getRandomInt(categoriesWithCourses.length)]._id
        ).populate({
            path: "courses",
            match: {status: "Published"},
            populate: {
                path: "ratingAndReviews"
            }
        }).exec();
                    //    console.log("differentCategory",differentCategory)           
                    
                    

        
        // get top selling Courses across all categories 
        const allCategories = await Category.find()
                                               .populate({
                                                path: "courses",
                                                match: {status: "Published"},
                                                populate:[
                                                    {
                                                        path: "instructor",
                                                    },
                                                    {
                                                        path: "ratingAndReviews"
                                                    }
                                                ]
                                               })
                                               .exec();
        
            const allCourses = allCategories.flatMap((category) => category.courses);
            // console.log("allCourses:",allCourses);

            // most selling Courses
            const mostSellingCourses = allCourses
                                         .sort((a,b) => b.sold - a.sold)
                                         .slice(0,10);
            // console.log("Most selling Courses:",mostSellingCourses);


        // return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to find category Page Details",
        });
    }
}
