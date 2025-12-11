import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetcher, useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { FaArrowLeftLong } from "react-icons/fa6";
import img from "../assets/empty.jpg";
import Card from "../components/Card.jsx";
import { setSelectedCourseData } from "../redux/courseSlice";
import { FaLock, FaPlayCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa6";

function ViewCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const [creatorData, setCourseData] = useState(null);
  const dispatch = useDispatch();
  const [selectedLecture, setSelectedLecture] = useState(null);
  //const { lectureData } = useSelector((state) => state.lecture);
  const { selectedCourseData } = useSelector((state) => state.course);
  const [selectedCreatorCourse, setSelectedCreatorCourse] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // const handleReview = async () => {
  //   try {
  //     const result = await axios.post(
  //       `{serverUrl}/api/review/givereview`,
  //       { rating, comment, courseId },
  //       { withCredentials: true }
  //     );
  //     taost.success("Review Added");
  //     console.log(result.data);
  //     setRating(0);
  //     setComment("");
  //   } catch (error) {
  //     console.log(error);
  //     Toast.error(error.response.data.messsage);
  //   }
  // };

  // const calculateAverageRating = (reviews) => {
  //   if (!reviews || reviews.length === 0) return 0;
  //   const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  //   return (total / reviews.length).toFixed(1);
  // };

  // const avgRating = calculateAverageRating(selectedCourseData?.reviews);
  // console.log("Average Rating", avgRating);

  const fetchCourseData = async () => {
    courseData.map((item) => {
      if (item._id === courseId) {
        dispatch(setSelectedCourseData(item));
        console.log(selectedCourseData);

        return null;
      }
    });
  };

  // const checkEnrollment = () => {
  //   const varify = userData?.enrolledCourses?.some(c => {
  //     const enrolledId = typeof c === 'string' ? c : c._id;
  //     return enrolledId?.toString() === courseId?.toString();
  //   })
  // }
  // console.log("Enrollment Verified:", varify);
  // if(verify) {
  //   setIsEnrolled(true);
  // }

  // useEffect(() => {
  //   fetchCourseData()
  //   checkEnrollment()
  // },[courseId,courseData,lectureData])

  useEffect(() => {
    const getCreator = async () => {
      if (selectedCourseData?.creator) {
        try {
          const result = await axios.post(
            `{serverUrl}/api/course/getcreator`,
            { userId: selectedCourseData.creator },
            { withCredentials: true }
          );
          setCourseData(result.data);
          console.log(result.data);
        } catch (error) {
          console.error("Error fetcching creator:", error);
        }
      }
    };
    getCreator();
  }, [selectedCourseData]);

  useEffect(() => {
    if (creatorData?._id && courseData.length > 0) {
      const creatorCourses = courseData.filter(
        (course) =>
          course.creator === creatorData._id && course._id !== courseId
      );
      setSelectedCreatorCourse(creatorCourses);
    }
  }, [creatorData, courseData]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <FaArrowLeftLong
              className="text-black w-[22px] h-[22px] cursor-pointer"
              onClick={() => navigate("/")}
            />
            {selectedCourseData?.thumbnail ? (
              <img
                src={selectedCourseData?.thumbnail?.url}
                alt="course Thumbnail"
                className="rounded-xl w-full object-cover"
              />
            ) : (
              <img
                src={img}
                alt="course Thumbnail"
                className="rounded-xl w-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
