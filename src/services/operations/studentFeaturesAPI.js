
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/Logo-Small-Dark.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
import toast from "react-hot-toast";

const { studentEndpoints } = require("../apis");


const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload =() => {
            resolve(true);
        }
        script.onerror =() => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch){
    const toastId = toast.loading("Loading...")
    
    try{
        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("Razorpay SDK Failed to load");
            return;
        }

        console.log("response..",res)
        // initiate the order
        const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,
            {courses},
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("orderResponse",orderResponse)

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        // options
        const options = {
            key:process.env.RAZORPAY_KEY,
            currency:orderResponse?.data?.data?.currency,
            amount: `${orderResponse?.data?.data?.amount}`,
            order_id:orderResponse?.data?.data?.id,
            name: "StudyNotion",
            description: "Thankyou For Puchasing the Course",
            image: rzpLogo,
            prefill:{
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email,
            },
            handler: function(response){
                // send successfull  Wala Email
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount, token)

                //verify Payment
                verifyPayment({...response, courses}, token, navigate, dispatch) 
            }

        }

        // miss ho gya tha modal open karne ke liye hai ye 
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("Payment .failed",function(response){
            toast.error("oops, payment failed")
            console.log(response.error);
        })
        console.log("Razorpay Options:", options);

    }
    catch(error){
        console.log("PAYMENT API ERROR ....",error);
        toast.error("Could not make payment ");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount ,token){
    try{
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId : response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },{
                Authorization: `Bearer ${token}`
            })
    }
    catch(error){
        console.log("SEND_PAYMENT_SUCCESS_EMAIL_API Error ...",error);
        toast.error()
    }
}

// verify payment 
async function verifyPayment(bodyData,token, navigate, dispatch){
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));
    try{
        const response = await apiConnector("POST",COURSE_VERIFY_API,bodyData,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        if(!response?.data?.success){
            throw new Error (response?.data?.message)
        }
        toast.success("Payment Successfull ,you are added to the course ");
        
        navigate("/dashboard/enrolled-courses");
        
        dispatch(resetCart());
        
    }
    catch(error){
        console.log("PAYMENT VERIFY ERROR...",error);
        toast.error("Could not verify Payment")
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}