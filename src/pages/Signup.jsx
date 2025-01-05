import React from 'react'
import Template from '../components/core/auth/Template'
import SignupImage from "../assets/Images/signup.webp"
import frame from "../assets/Images/frame.png"

const Signup = (setIsloggedIn) => {
  return (
    <div>
        <Template 
           title="Join the millions learning to code with StudyNotion for free"
           desc1="Build Skills for today ,tomorrow and beyond."
           desc2="Education to future-proof your career."
           image2={frame}
           image1={SignupImage}
           formtype="signup"
           setIsloggedIn={setIsloggedIn}
        />
    </div>
  )
}

export default Signup
