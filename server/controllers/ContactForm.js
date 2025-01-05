const Contact= require("../models/ContactForm");
const mailSender = require("../utils/mailSender");

exports.submitContactForm= async(req,res) => {
    try{
        // fetched the data from req body
        const {name,email,message}= req.body;

        // validate the data 
        if(!name ||!email ||!message ){
            return res.status(401).json({
                success:false,
                message:"All feilds are required",
            });
        }

        // save in the database 
        const newContact = await Contact.create({name,email,message})

           // send the email to user
        const emailResponse= await mailSender(email,
                                             "Thankyou",
                                             "Thankyou for coantactig us .we will back to you soon",
        );
        if(!emailResponse){
            return res.status(401).json({
                success:false,
                message:"Email not send to the user",
            });
        }
        // return respoonse
        return res.status(200).json({
            success:true,
            message:"Thankyou for contacting us .we will get back to you soon",
            data:newContact,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to submit Contact Form, Please Try again",
        });
    }
}