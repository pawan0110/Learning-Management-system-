import React from 'react'
import { useSelector } from 'react-redux'
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from "recharts"; 
import { FaArrowLeftLong } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
    const navigate = useNavigate()
    const {userData} = useSelector((state) => state.user);
    const { creatorCourseData} = useSelector((state) => state.course);

    const courseProgressData = creatorCourseData?.map(course=>({
        name: course.title.slice(0, 10) + "...",
        lectures: course.lectures.length || 0
    })) || [];

    const enrollData = creatorCourseData?.map(course => ({
        name: course.title.slice(0, 10) + "...",
        enrolled: course.enrolledStudents?.length || 0
    })) || [];

    const totalEarnings = creatorCourseData?.reduce((sum, course) => {
        const studentCount = course.enrolledStudents?.length || 0;
        const courseRevenue = course.price ? course.price*studentCount : 0;
        return sum + courseRevenue;
    },0) || 0;

  return (
    <div className='flex min-h-screen bg-gray-100'>
    <FaArrowLeftLong className='w-[22px] absolute top-[10%] left-[10%] h-[22px] cursor-pointer onClick={() => naviagte("/")}'/>
    <div className='w-full px-6 py-10 bg-gray space-y-10'>
    <div className='max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flx-row items-center gap-6'>

    </div>

    </div>

    </div>
  )
}

export default Dashboard