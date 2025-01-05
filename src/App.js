import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import { useSelector } from "react-redux";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import Error from "./pages/Error";
import Setting from "./components/core/Dashboard/setting/index";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/index,";
import { ACCOUNT_TYPE } from "./utils/constants";
import MyCourses from "./components/core/Dashboard/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse/index";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetailsSidebar from "./components/core/ViewCourse/VideoDetailsSidebar";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";





function App() {

  const {user}= useSelector((state)=> state.profile)

  // const dispatch= useDispatch();
  // useEffect(() => {
  //   // Check if user data and token are stored in localStorage
  //   const storedUser = localStorage.getItem("user");
  //   const storedToken = localStorage.getItem("token");

  //   if (storedUser && storedToken) {
  //     // Dispatch user and token to the Redux store
  //     dispatch(setUser(JSON.parse(storedUser)));
  //     dispatch(setToken(JSON.parse(storedToken)));
  //   }
  // }, [dispatch]);
 
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/catalog/:catalogName" element={<Catalog/>}/>
        <Route path="/courses/:courseId" element={<CourseDetails/>}/>




        <Route 
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
         />
        <Route 
            path="/signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
         />
       <Route 
            path="/forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
         />
         <Route 
            path="/update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
         />
         <Route 
            path="/verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
         />
         {/* <Route 
            path="/profiledropdown"
            element={
              <OpenRoute>
                <ProfileDropDown />
              </OpenRoute>
            }
         /> */}
         <Route 
            path="/about"
            element={
             
                <About />
            }
         />
         <Route 
            path="/contact"
            element={
              <ContactUs />
            }
         />
         <Route 
            element={
              <PrivateRoute>
                  <Dashboard/>
              </PrivateRoute>
            }
         >
           <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
           <Route path="/dashboard/settings" element={<Setting/>}/>
           

           {
            user?.accountType === ACCOUNT_TYPE?.STUDENT &&(
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                <Route path="/dashboard/cart" element={<Cart/>}/>
              </>
            )
           }
           {
            user?.accountType ===ACCOUNT_TYPE?.INSTRUCTOR && (
              <>
                <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
                <Route path="/dashboard/add-course" element={<AddCourse/>}/>
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>
                <Route path="/dashboard/instructor" element={<Instructor/>}/>
              </>
            )
           }
           
          </Route>

          <Route 
            element= {
              <PrivateRoute>
                 <ViewCourse/>
              </PrivateRoute>
            }
          >
             {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                 <Route 
                   path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                   element=
                   {<VideoDetails/>}
                 />
                </>
              )
             }
          </Route>
      
         
        <Route path="*" element={<Error/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
