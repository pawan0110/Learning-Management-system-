import React, { useState } from "react";
import logo from "../assets/signup3.jpg";
import { IoMdPerson } from "react-icons/io";
import { GiHamburgerMenu, GiSplitCross } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Nav() {
  const [showHam, setShowHam] = useState(false);
  const [showPro, setShowPro] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
      dispatch(setUserData(null));
      toast.success("LogOut Successfully");
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <div className="w-full h-[70px] fixed top-0 px-5 py-2.5 flex items-center justify-between bg-[#00000047] z-10">
        
        <div className="lg:w-1/5 w-2/5 lg:pl-10">
          <img
            src={logo}
            className="w-[60px] rounded-[5px] cursor-pointer"
            onClick={() => navigate("/")}
            alt="logo"
          />
        </div>

       
        <div className="w-[30%] hidden lg:flex items-center justify-end gap-4 pr-10">
          {!userData ? (
            <IoMdPerson
              className="w-[50px] h-[50px] fill-white cursor-pointer bg-[#000000d5] rounded-full p-2.5"
              onClick={() => navigate("/login")}
            />
          ) : (
            <div
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] bg-black cursor-pointer"
              onClick={() => setShowPro((prev) => !prev)}
            >
              {userData.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  className="w-full h-full rounded-full object-cover"
                  alt="profile"
                />
              ) : (
                <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] bg-black cursor-pointer">
                  {userData?.name.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
          )}

          {userData?.role === "educator" && (
            <div
              className="px-5 py-2.5 bg-black text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </div>
          )}

          {!userData ? (
            <span
              className="px-5 py-2.5 text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="px-5 py-2.5 bg-white text-black rounded-[10px] shadow-sm text-[18px] cursor-pointer"
              onClick={handleLogout}
            >
              LogOut
            </span>
          )}
        </div>

      
        {userData && showPro && (
          <div className="absolute top-[110%] right-[8%] flex flex-col items-center justify-center gap-2 text-[16px] rounded-md bg-white px-4 py-2.5 cursor-pointer">
            <span
              className="bg-black text-white px-7 py-2.5 rounded-2xl hover:bg-gray-600"
              onClick={() => {
                navigate("/profile");
                setShowPro(false);
              }}
            >
              My Profile
            </span>
            <span
              className="bg-black text-white px-6 py-2.5 rounded-2xl hover:bg-gray-600"
              onClick={() => {
                navigate("/enrolledcourses");
                setShowPro(false);
              }}
            >
              My Courses
            </span>
          </div>
        )}

        <GiHamburgerMenu
          className="w-[30px] h-[30px] lg:hidden fill-white cursor-pointer mr-3"
          onClick={() => setShowHam((prev) => !prev)}
        />
      </div>

      <div
        className={`fixed top-0 w-screen h-screen bg-[#000000d6] flex flex-col items-center justify-center gap-5 z-10 transition-transform duration-500 ease-in-out ${
          showHam ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <GiSplitCross
          className="w-[35px] h-[35px] fill-white absolute top-5 right-5 cursor-pointer"
          onClick={() => setShowHam((prev) => !prev)}
        />

        {userData ? (
          <>
            <div
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] bg-black cursor-pointer"
              onClick={() => setShowPro((prev) => !prev)}
            >
              {userData.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  className="w-full h-full rounded-full object-cover"
                  alt="profile"
                />
              ) : (
                <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] bg-black cursor-pointer">
                  {userData?.name.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>

            <span
              className="flex items-center justify-center gap-2 text-white bg-[#000000d5] rounded-lg px-16 py-5 text-[18px]"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </span>

            <span
              className="flex items-center justify-center gap-2 text-white bg-[#000000d5] rounded-lg px-16 py-5 text-[18px]"
              onClick={() => navigate("/enrolledcourses")}
            >
              My Courses
            </span>

            {userData?.role === "educator" && (
              <div
                className="flex items-center justify-center gap-2 text-[18px] text-white bg-[#000000d5] rounded-lg px-14 py-5"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </div>
            )}

            <span
              className="flex items-center justify-center gap-2 text-[18px] text-white bg-[#000000d5] rounded-lg px-20 py-5"
              onClick={handleLogout}
            >
              LogOut
            </span>
          </>
        ) : (
          <span
            className="flex items-center justify-center gap-2 text-[18px] text-white bg-[#000000d5] rounded-lg px-20 py-5"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        )}
      </div>
    </div>
  );
}

export default Nav;
