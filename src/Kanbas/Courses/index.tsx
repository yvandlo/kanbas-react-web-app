import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { links } from "../Database"
import { FaGreaterThan } from "react-icons/fa";
import Quizzes from "./Quizzes";
import QuizDetail from "./Quizzes/Detail";
import QuizEdit from "./Quizzes/Edit/index";
const API_BASE = process.env.REACT_APP_API_BASE;

function Courses() {
  const { courseId, section } = useParams();
  const { pathname } = useLocation();
  //const COURSES_API = "http://localhost:4000/api/courses";
  const COURSES_API = `${API_BASE}/api/courses`;
  const [course, setCourse] = useState<any>({ _id: "" });
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(
      `${COURSES_API}/${courseId}`
    );
    setCourse(response.data);
  };
  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);
  return (
    <div>
      <h2 ><HiMiniBars3 /> Course {course?.name} <FaGreaterThan className="fs-5" />
        {links.filter((link) => (pathname.includes(link)))}
      </h2>
      <hr />
      <CourseNavigation />
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "210px", top: "60px" }} >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:quizId/Details" element={<QuizDetail />} />
            <Route path="Quizzes/:quizId/Edit/*" element={<QuizEdit />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
            <Route path="Grades" element={<h1>Grades</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default Courses;