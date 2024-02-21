import { courses } from "../Database/";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { links } from "../Database"
import { FaGreaterThan } from "react-icons/fa";


function Courses() {
  const { courseId, section } = useParams();
  const { pathname } = useLocation();
  const course = courses.find((course) => course._id === courseId);
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