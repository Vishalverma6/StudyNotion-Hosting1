import React from 'react'
import Template from '../components/core/auth/Template'
import loginImg from "../assets/Images/login.webp"
import frame from "../assets/Images/frame.png"
const Login = () => {
  return (
    <Template
    title="Welcome Back"
    desc1="Build Skills for today ,tomorrow and beyond."
    desc2="Education to future-proof your career."
    image1={loginImg}
    image2={frame}
    formtype="login"   
     
    />
  )
}

export default Login
