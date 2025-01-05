import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import { CiShoppingCart } from 'react-icons/ci'
import ProfileDropDown from '../core/auth/ProfileDropDown'
import { categories } from '../../services/apis'
import { apiConnector } from '../../services/apiconnector'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import { ACCOUNT_TYPE } from '../../utils/constants'




const Navbar = () => {
    const {token}=useSelector( (state) => state.auth);
    const {user} =useSelector((state)=> state.profile);
    const {totalItems}= useSelector((state)=> state.cart);

    const location= useLocation();

    const [subLinks,setSubLinks]= useState([]);

    const fetchSubLinks=  async()=> {
        try{
            const result = await apiConnector("GET",categories.CATEGORIES_API);
            console.log("Printing Sublinks ",result);
            console.log("Data",result.data)
            setSubLinks(result.data.allcategories);

        }
        catch(error){
            console.log("Could not fetched the category list")
        }
    }

    useEffect ( () => {
        fetchSubLinks();
    },[])

    const matchRoute =(route) => {
        return matchPath({path:route},location.pathname);
    }
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-700 '>
        <div className='flex w-11/12 max-w-maxContent items-center  justify-between px-24'>
            {/* Image */}
            <Link to="/">
                <img src={logo} alt='studyNotion'
                width={160} height={42} loading='lazy'/>
            </Link>

            {/* Nav Links */}
            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map( (link,index) => (
                            <li key={index}>
                                {
                                    link.title==="Catalog" ? (
                                         <div className=' relative flex items-center gap-2 cursor-pointer group'>
                                            <p>{link.title}</p>
                                            <IoIosArrowDropdownCircle/>

                                            <div className='invisible absolute z-40 left-[50%] right-[50%] 
                                            translate-x-[-38%] translate-y-[65%]
                                            flex flex-col gap-3 rounded-md bg-richblack-25 p-4 text-richblack-900
                                            opacity-0 transition-all duration-200 group-hover:visible cursor-pointer 
                                            group-hover:opacity-100 w-[230px] '>

                                                <div className='absolute left-[50%] top-0
                                                translate-x-[-25%]
                                                 translate-y-[-60%] h-6 w-6 rotate-45 rounded bg-richblack-25'>

                                                </div>

                                                {
                                                    subLinks.length ? (
                                                        subLinks.map( (subLink,index) => (
                                                            <Link to={`/catalog/${subLink.name
                                                                        .split(" ")
                                                                        .join("-")
                                                                        .toLowerCase()
                                                            }`} key={index}
                                                              
                                                            >
                                                               <p className='text-richblack-500 flex flex-col  hover:bg-red-500  rounded-md py-[2px] px-2'> {subLink.name}</p>
                                                            </Link>
                                                        ))
                                                    )
                                                    
                                                    : (<div></div>)
                                                }

                                            </div>
                                         </div>
                                        ):(
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) ? ("text-yellow-25"): 
                                                ("text-richblack-25")}`}>
                                                {link.title}
                                            </p>
                                            
                                        </Link>
                                    )
                                }

                            </li>
                        ))
                    }
                </ul>
            </nav>

            {/* Signup and login button */}
            <div className='hidden gap-x-4 items-center md:flex'>
                {
                    // HW: add css to cart
                    user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to="/dashboard/cart" className='relative'
                        >
                            <CiShoppingCart 
                            className='text-2xl text-richblack-100 '/>
                            {
                                totalItems > 0 && (
                                    <span className='absolute -bottom-2 -right-2 grid  h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100 '>
                                        {totalItems}
                                    </span>
                                )
                            }
                        
                        </Link>
                    )
                }
                {
                    token===null && (
                        <Link to="/login">
                            <button className='border border-richblack-700 bg-richblack-800 px-[10px] py-[6px]
                            text-richblack-100 rounded-md'>
                                Log In
                            </button>                        
                        </Link>
                    )
                }
                {
                    token===null && (
                        <Link to="/signup">
                            <button className='border border-richblack-700 bg-richblack-800 px-[10px] py-[6px]
                            text-richblack-100 rounded-md'>
                                Sign Up
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && (<ProfileDropDown/>)
                }
            </div>
           
        </div>
    </div>
  )
}

export default Navbar
