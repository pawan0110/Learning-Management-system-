import React, { useState } from "react";
import logo from "../assets/signup3.jpg";
import { IoIosEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import axios from "axios"; 
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function SignUp() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [role, setRole] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const handleSignup = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`, // <- ensure slash between serverUrl and route
        { name, password, email, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result?.data))
      setLoading(false);
      navigate("/");
      toast.success("signup successfully"); 
    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message || error.message || "Signup failed";
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
   
    <div className="bg-[#dddbdb] w-screen h-screen flex items-center justify-center">
      <form className="w-[90%] md:w-[800px] h-[600px] bg-white shadow-xl rounded-2xl flex" onClick={(e) => e.preventDefault()}>
        {/* Left div */}
        <div className="md:w-1/2 w-full h-full flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-[black] text-2xl">
              Let's get started
            </h1>
            <h2 className="text-[#999797] text-[18px]">Create your account</h2>
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="border w-full h-[35px] border-[#e7e6e6] text-[15px] px-[7px]"
              placeholder="your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border w-full h-[35px] border-[#e7e6e6] text-[15px] px-[7px]"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              id="password"
              type={show ? "text" : "password"}
              className="border w-full h-[35px] border-[#e7e6e6] text-[15px] px-[7px]"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!show ? (
              <IoIosEye
                className="absolute w-5 h-5 cursor-pointer right-[5%] top-[75%] transform -translate-y-1/2"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <FaEyeSlash
                className="absolute w-5 h-5 cursor-pointer right-[5%] top-[75%] transform -translate-y-1/2"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          <div className="flex md:w-[50%] w-[70%] items-center justify-between">
            <span
              className={`px-2.5 py-[5px] border-2 border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${
                role === "student" ? "border-black" : "border-[#646464]"
              }`}
              onClick={() => setRole("student")}
            >
              Student
            </span>
            <span
              className={`px-2.5 py-[5px] border-2 border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${
                role === "educator" ? "border-black" : "border-[#646464]"
              }`}
              onClick={() => setRole("educator")}
            >
              Educator
            </span>
          </div>
          <button className="w-[80%] h-10 bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]" onClick={handleSignup} disabled={loading}>
            {loading ? <ClipLoader size={30} color="white" /> : "Signup"}
          </button>
           <div className="text-[#6f6f6f]">
            already have an account
            <span
              className="underline underline-offset-1 text-[black] cursor-pointer"
              onClick={() => navigate("/login")}
            >
              {" "}
              Login
            </span>
          </div>

          {/* ...rest of UI unchanged ... */}
        </div>

        {/* Right div */}
        <div className="md:w-1/2 w-0 h-full rounded-r-2xl bg-black md:flex flex-col items-center justify-center hidden">
          <img src={logo} alt="logo" className="w-32 mb-3 drop-shadow-lg" />
          <span className="text-3xl text-white font-extrabold tracking-wide">
            CodeNex
          </span>
        </div>
      </form>
    </div>
  );
}

export default SignUp;