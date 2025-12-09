import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'


function ViewCourse() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const {courseData} = useSelector(state=>state.course)
    const {userData} = useSelector(state=>state.user)
    const [creatorData, setCourseData] = useState(null)
    const dispatch = useDispatch()
    const [selectedLecture, setSelectedLecture] = useState(null);
    const {lectureData} = useSelector(state=>state.lecture)
    const {selectedCourseData} = useSelector(state=>state.course)
    const [selectedCreatorCourse, setSelectedCreatorCourse] = useState([])
    const [isEnrolled,setIsEnrolled] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
  return (
    <div>ViewCourse</div>
  )
}

export default ViewCourse