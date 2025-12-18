import React, { useEffect } from "react";
import home from "../assets/home1.jpg";
import Nav from "../components/Nav";
import { SiViaplay } from "react-icons/si";
import Logos from "../components/Logos";
import Cardspage from "../components/Cardspage.jsx";
import ExploreCourses from "../components/ExploreCourses";
import About from '../components/About';
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import ReviewPage from '../components/ReviewPage';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../config";
import { setCourseData } from "../redux/courseSlice.js";
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/course/getpublishedcourses`,
          { withCredentials: true }
        );
        dispatch(setCourseData(res.data));
      } catch (error) {
        console.log("Failed to fetch courses", error);
      }
    };
    fetchCourses();
  }, [dispatch]);

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full lg:h-[140vh] h-[70vh] relative">
        <Nav />
        <img
          src={home}
          className="object-cover md:object-fill   w-full lg:h-full h-[50vh]"
          alt=""
        />
        <span className="lg:text-[70px] absolute  md:text-[40px]  lg:top-[10%] top-[15%] w-full flex items-center justify-center text-white font-bold text-[20px] ">
          “Learn. Build. Evolve.”
        </span>
        <span className="lg:text-[70px] text-[20px] md:text-[40px] absolute lg:top-[18%] top-[20%] w-full flex items-center justify-center text-white font-bold">
          Turn Your Code into a Career with CodeNex
        </span>
        <div className="absolute lg:top-[30%] top-[75%]  md:top-[80%] w-full flex items-center justify-center gap-3 flex-wrap">
          <button
            className="px-full py-full border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer"
            onClick={() => navigate("/allcourses")}
          >
            View all Courses{" "}
            <SiViaplay className="w-[30px] h-[30px] lg:fill-white fill-black" />
          </button>
          <button
            className="px-5 py-2.5 lg:bg-white bg-black lg:text-black text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center"
            onClick={() => navigate("/searchwithai")}
          >
            Search with AI{" "}
            <img
              src={ai}
              className="w-[30px] h-[30px] rounded-full hidden lg:block"
              alt=""
            />
            <img
              src={ai1}
              className="w-[35px] h-[35px] rounded-full lg:hidden"
              alt=""
            />
          </button>
        </div>
      </div>
      <Logos />

      <ExploreCourses />

      <Cardspage />
      <About />
      <ReviewPage/>
      <Footer />
    </div>
  );
}

export default Home;
