
const User=require("../models/User");
const mailSender= require("../utils/mailSender");
const bcrypt= require("bcryptjs");
const crypto= require("crypto");



// resetPasswordToken
exports.resetPasswordToken = async(req,res) => {
   try{ 
     // get email from req body
    const email = req.body.email;

    // check user for this email
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(401).json({
            success:false,
            message:"Your Email is not registered with us",
        });
    }

    // generate token 
    const token = crypto.randomUUID();

    // update user by adding token and expiration time 
    const updatedDetails= await User.findOneAndUpdate(
                                    {email:email},
                                     {
                                        token:token,
                                        resetPasswordExpires:Date.now() + 5*60*1000,
                                     },
                                      {new:true});
                                
    // create url
    const url = `http://localhost:3000/update-password/${token}`;

    // send mail containing the url
    await mailSender(email, 
                        "Password Reset Link",
                        `Password Reset Link : ${url}`)

    //  return response
    return res.status(200).json({
        success:true,
        message:"Email sent successfully, Please check email and change password",
    });
   }
   catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Something wetn wrong while sending reset password email, Please try again",
    });
   }
}

// resetPassword 
exports.resetPassword= async(req,res)=> {
    try{
        // data fetch
        const {password,confirmPassword,token}= req.body;

        // validation
        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password and confirm password does not match",
            });
        }

        // get userDetails from DB using token
        const userDetails= await User.findOne({token:token});

        // if no entry -invalid token
        if(!userDetails) {
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            });
        }

        // token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success:false,
                message:"Token is expired ,Please regenerate Your token",
            });
        }

        // hashed password
        const hashedPassword = await bcrypt.hash(password,10);

        // password Update
        await User.findOneAndUpdate(
                                    {token:token},
                                    {password:hashedPassword},
                                    {new:true},

        );

        // return response
        return res.status(200).json({
            success:true,
            message:"Password reset successful",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Resetting of Password is failed,Please try later",
        });
    }
}