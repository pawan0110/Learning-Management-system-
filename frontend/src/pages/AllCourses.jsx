import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import ai from "../assets/SearchAi.png";
import { useSelector } from "react-redux";
import Card from "../components/Card";   // ← UNCOMMENT THIS LINE

function AllCourses() {
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [category, setCategory] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);

  const { courseData } = useSelector((state) => state.course);

  // ---------- SHOW ALL COURSES BY DEFAULT ----------
  useEffect(() => {
    if (courseData) {
      setFilterCourses(courseData);
    }
  }, [courseData]);

  // ---------- CATEGORY FILTER HANDLER ----------
  const toggleCategory = (e) => {
    const value = e.target.value;

    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // ---------- APPLY FILTER ----------
  useEffect(() => {
    if (category.length === 0) {
      setFilterCourses(courseData);
    } else {
      const filtered = courseData.filter((course) =>
        category.includes(course.category)
      );
      setFilterCourses(filtered);
    }
  }, [category]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Nav />

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarVisible((prev) => !prev)}
        className="fixed top-20 left-4 z-50 bg-white text-black px-3 py-1 rounded md:hidden border-2 border-black"
      >
        {isSidebarVisible ? "Hide" : "Show"} Filters
      </button>

      {/* Sidebar */}
      <aside
        className={`w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5
        ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"}
        md:block md:translate-x-0`}
      >
        <h2 className="text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6">
          <FaArrowLeftLong
            className="text-white cursor-pointer"
            onClick={() => navigate("/")}
          />
          Filter by Category
        </h2>

        {/* Filter Section */}
        <div className="space-y-4 text-sm bg-gray-600 text-white border border-white p-5 rounded-2xl">
          <button
            className="px-2.5 py-2.5 bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => navigate("/searchwithai")}
          >
            Search with AI
            <img src={ai} className="w-[30px] h-[30px] rounded-full" alt="" />
          </button>

          {[
            "App Development",
            "AI/ML",
            "AI Tools",
            "Data Science",
            "Data Analytics",
            "Ethical Hacking",
            "UI UX Designing",
            "Web Development",
            "Others",
          ].map((cat, index) => (
            <label
              key={index}
              className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
            >
              <input
                type="checkbox"
                className="accent-black w-4 h-4 rounded-md"
                value={cat}
                onChange={toggleCategory}
              />
              {cat}
            </label>
          ))}
        </div>
      </aside>

      ------- MAIN CONTENT: COURSE CARDS -------
      <main className="w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-2.5">
        {filterCourses?.length > 0 ? (
          filterCourses.map((item, index) => (
            <Card
              key={index}
              thumbnail={item.thumbnail?.url}  // FIXED
              title={item.title}
              price={item.price}
              category={item.category}
              id={item._id}
              reviews={item.reviews}
            />
          ))
        ) : (
          <p className="text-gray-600 text-lg">No courses found.</p>
        )}
      </main>
    </div>
  );
}

export default AllCourses;
