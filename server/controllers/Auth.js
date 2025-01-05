const User= require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator= require("otp-generator");
const bcrypt = require("bcryptjs");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
require("dotenv").config();

// Send otp 
exports.sendOTP = async(req,res) => {
  try{   // fetch email from req body
    const {email} = req.body;


    // check the email if already exist
    const checkUserPresent = await User.findOne({email});

    // if user already present then return a response 
    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"User already registered",
        })
    }

    // generate otp
    var otp =otpGenerator.generate(6, {
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });
    console.log("OTP generated :",otp);

    // check unique otp or not 
    let result =await OTP.findOne({otp:otp});

    while(result){
        otp= otpGenerator(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        result= await OTP.findOne({otp:otp});
    }

    const otpPayload = {email,otp};

    // create an entry fot OTP 
    const otpBody= await OTP.create(otpPayload);
    console.log(otpBody);

    // return response successful
    return res.status(200).json({
        success:true,
        message:"OTP Sent successfully",
        otp,
    
    })
    
  }
  catch(error){

    console.log(error);
    return res.status(500).json({
        success:false,
        message:error.message,
    })
  }

}



// signup
exports.signUp=async(req,res)=> {

    try{
         // data fetch from the request body
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp
    } = req.body;

    // validate krlo
    if(!firstName || !lastName || !email || !password || !confirmPassword ||
        !otp) {
            return res.status(401).json({
                success:false,
                message:"All fields are Required",
            })
        }

        // Password match karlo
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirmpassword  does not Match, Plese try again ",
            });
        }

        // check user already exist or not

        const existingUser= await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already registered",
            });
        }


         // Find the most recent OTP stored for the user
         const recentOtp = await OTP.findOne({ email}).sort({ createdAt: -1 }).limit(1);
         console.log("recent OTP:", recentOtp);
 
         // Validate OTP
         if (!recentOtp) {
             return res.status(400).json({
                 success: false,
                 message: "OTP not found",
             });
         }
        else if(otp !== recentOtp.otp){
            // invalid OTP
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password,10);
        console.log("hashed password",hashedPassword);

        // entry creation in db
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        
        });

        // return response 
        return res.status(200).json({
            success:true,
            message:"Signup Successful, Please Login",
            data:user,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered,Please try again",
        });
    }

}


// login
exports.login= async(req,res) => {
    try{
        // get data from req body
        const {email,password}=req.body;

        // validation of data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required ,please try again",
            });
        }
        // user check exist or not 
        const user =await User.findOne({email}).populate("additionalDetails");
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User is not registered ,Please signup first",
            });
        }

        // generate Jwt ,after password matching 
        if(await bcrypt.compare(password,user.password)) {

            const payload ={
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            user.token=token;
            user.password=undefined;

             // create cookie and send response
             const Options = {
                expires:new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
             }
             res.cookie("token",token,Options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged In successfully",
             })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password Incorrect",
            });
        }

        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure ,Please try again",
        });
    }
}

// change password 
exports.changePassword = async (req,res) => {
    try{ 
        // gat data from req body
        const {oldPassword ,newPassword ,confirmNewPassword}= req.body;

        // validation
        if(!oldPassword || !newPassword || !confirmNewPassword){
            return res.status(401).json({
                success:false,
                message:"All fields are require",
            });
        }

        // validate the newpassword and confirm password
        if(newPassword !== confirmNewPassword){
            return res.status(401).json({
                success:false,
                message:"Newpassword and confirm password do not match",
            });
        }

        // validate the old password (for validating the password we should find the passwaor from DB)
        const user =await User.findById(req.user.id);
       
        const isMatch= await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Old password do not match",
            });
        }

        // hash the password 
        const hashedPassword = await bcrypt.hash(newPassword,10);
    
        // update password in DB
        await user.updateOne({password:hashedPassword});

        // send mail - Passwword updated
        const emailResponse= await mailSender(user.email,"Password updated","Your password has been updated successfully");
        console.log("Email-password update",emailResponse);

         // return response
         return res.status(200).json({
            success:true,
            message:"Password has been changed successfully ",
         });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Password Cannot Change,Please try Later",
        });
    }
   
}