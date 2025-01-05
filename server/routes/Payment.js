const express= require("express");
const router= express.Router();

const { auth, isStudent } = require("../middlewares/auth");
const { capturePayment, verifyPayment, sendPaymentSuccessEmail,  } = require("../controllers/Payments");




// routes for capturing payment 
router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifyPayment",auth, isStudent, verifyPayment);
router.post("/sendPaymentSuccessfullEmail",auth,isStudent,sendPaymentSuccessEmail)


module.exports=router;