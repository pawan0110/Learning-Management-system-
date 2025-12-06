import React from "react";
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics, TbBrandOpenai } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { SiGoogledataproc, SiOpenaigym } from "react-icons/si";
import { BsClipboardDataFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function ExploreCourses() {
  const navigate = useNavigate();

  const categories = [
    { icon: <TbDeviceDesktopAnalytics />, label: "Web Development", color: "bg-[#fbd9fb]" },
    { icon: <LiaUikit />, label: "UI/UX Designing", color: "bg-[#d9fbe0]" },
    { icon: <MdAppShortcut />, label: "App Development", color: "bg-[#fcb9c8]" },
    { icon: <FaHackerrank />, label: "Ethical Hacking", color: "bg-[#fbd9fb]" },
    { icon: <TbBrandOpenai />, label: "AI/ML", color: "bg-[#d9fbe0]" },
    { icon: <SiGoogledataproc />, label: "Data Science", color: "bg-[#fcb9c8]" },
    { icon: <BsClipboardDataFill />, label: "Data Analytics", color: "bg-[#fbd9fb]" },
    { icon: <SiOpenaigym />, label: "AI Tools", color: "bg-[#d9fbe0]" },
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 px-6 py-14">

      {/* Left Section */}
      <div className="w-full lg:w-1/3 flex flex-col items-start gap-3">
        <span className="text-3xl md:text-4xl font-bold">Explore</span>
        <span className="text-3xl md:text-4xl font-bold">Our Courses</span>
        <p className="text-base text-gray-700 mt-2">
          Learn the most in-demand skills and technologies to advance your career in
          web development, AI, design, and more.
        </p>

        <button
          onClick={() => navigate("/allcourses")}
          className="px-8 py-3 bg-black text-white rounded-lg text-lg font-light flex items-center gap-2 mt-6 hover:bg-gray-800 transition"
        >
          Explore Courses <SiViaplay className="w-6 h-6" />
        </button>
      </div>

      {/* Right Section (Courses Grid) */}
      <div className="w-full lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map(({ icon, label, color }, index) => (
          <div
            key={index}
            onClick={() => navigate(`/courses?category=${label}`)}
            className="flex flex-col items-center cursor-pointer text-center text-sm font-medium gap-2"
          >
            <div
              className={`w-20 h-20 ${color} rounded-lg flex items-center justify-center transition transform hover:scale-110 hover:shadow-lg`}
            >
              {React.cloneElement(icon, { className: "w-10 h-10 text-gray-700" })}
            </div>
            {label}
          </div>
        ))}
      </div>

    </div>
  );
}

export default ExploreCourses;
