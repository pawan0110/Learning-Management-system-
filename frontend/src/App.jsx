import React ,{useEffect}from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/signUp.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import getCurrentUser from "./customHooks/getCurrentUser.js";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile.jsx";
import AddCourses from './pages/admin/AddCourses'
 import Dashboard from './pages/admin/Dashboard'
import Courses from './pages/admin/Courses'
import CreateLecture from "./pages/admin/CreateLecture.jsx";
import EditLecture from "./pages/admin/EditLecture.jsx";
import AllCourses from "./pages/AllCourses.jsx";
import CreateCourse from './pages/admin/CreateCourse'
//import CreateLecture from './pages/admin/CreateLecture'
import ForgetPassword from "./pages/ForgetPassword.jsx";
import EditProfile from './pages/EditProfile.jsx'
import getCourseData from "./customHooks/getCourseData.jsx";
import ViewCourse from './pages/ViewCourse'
import { AuthRoute, PrivateRoute } from "./components/ProtectedRoutes.jsx";
import ViewLecture from "./pages/viewLecture.jsx";
import EnrolledCourse from "./pages/admin/EnrolledCourse.jsx";
//import EnrolledCourse from './pages/EnrolledCourse'
import  getCreatorCourseData from "./customHooks/getCreatorCourseData.jsx"

import useGetAllReviews from './customHooks/getAllReviews'
import ScrollToTop from "./components/ScrollToTop.jsx";
 

function App() {
 
  let { userData } = useSelector((store) => store.user);

  
  getCurrentUser()
  getCourseData()
  getCreatorCourseData()
  useGetAllReviews()


 

  return (
    <>
      <ScrollToTop/>
      <ToastContainer />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />

        <Route element={<AuthRoute />}>
          <Route
            path="/signup"
            element={!userData ? <SignUp /> : <Navigate to={"/"} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<ForgetPassword />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        
         <Route path='/editprofile' element={userData?<EditProfile/>:<Navigate to={"/signup"}/>}/>
         <Route path='/enrolledcourses' element={userData?<EnrolledCourse/>:<Navigate to={"/signup"}/>}/>

         <Route path= '/viewcourse/:courseId' element={userData?<ViewCourse/>:<Navigate to={"/signup"}/>}/>
         <Route path= '/viewlecture/:courseId' element={userData?<ViewLecture/>:<Navigate to={"/signup"}/>}/>


           <Route path='/allcourses' element={userData?<AllCourses/>:<Navigate to={"/signup"}/>}/>
         <Route path='/dashboard' element={userData?.role==="educator"?<Dashboard/>:<Navigate to={"/signup"}/>}/>
         <Route path='/courses' element={userData?.role==="educator"?<Courses/>:<Navigate to={"/signup"}/>}/>
          <Route path='/addcourses/:courseId' element={userData?.role === "educator"?<AddCourses/>:<Navigate to={"/signup"}/>}/>
        <Route path='/createcourses' element={userData?.role === "educator"?<CreateCourse/>:<Navigate to={"/signup"}/>}/>
        {/* <Route path='/createlecture/:courseId' element={userData?.role === "educator"?<CreateLecture/>:<Navigate to={"/signup"}/>}/>
         <Route path='/editlecture/:courseId/:lectureId' element={userData?.role === "educator"?<EditLecture/>:<Navigate to={"/signup"}/>}/>
        <Route path='/forgotpassword' element={ForgetPassword}/> */}
      </Routes>
    </>
  );
}

export default App;
