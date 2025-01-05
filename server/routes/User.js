const express =require("express");

const router= express.Router();

const { login, signUp, sendOTP, changePassword } = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");
const { resetPassword, resetPasswordToken } = require("../controllers/ResetPassword");




// Routes for login,Signup and Authentication


// Routes for login
router.post("/login",login);

// Routes for signup
router.post("/signup",signUp);

// Routes for sending OTP to the user's email
router.post("/sendotp",sendOTP);

// Routes for Changing the password
router.post("/changepassword",auth,changePassword);


                //    Reset password


// Route for generating a reset password token
router.post("/reset-password-token",resetPasswordToken);

// routes for reset password
router.post("/reset-password",resetPassword);

// Export the router for use in the main applicaion
module.exports=router;