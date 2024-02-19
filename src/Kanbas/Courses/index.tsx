import { courses } from "../Database/";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import { links } from "../Database"
import { FaGreaterThan } from "react-icons/fa";


function Courses() {
  const { courseId, section } = useParams();
  const { pathname } = useLocation();
  const course = courses.find((course) => course._id === courseId);
  return (
    <div>
      <h2><HiMiniBars3 /> Course {course?.name} <FaGreaterThan className="fs-5" />
        {links.filter((link) => (pathname.includes(link)))}
      </h2>
      <CourseNavigation />
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "320px", top: "50px" }} >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<h1>Home</h1>} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<h1>Assignments</h1>} />
            <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
            <Route path="Grades" element={<h1>Grades</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default Courses;