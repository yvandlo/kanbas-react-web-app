import { Link } from "react-router-dom";
import courses from "../Database/courses.json";
import Courses from "./../Courses";
import { Routes, Route } from "react-router";

function Dashboard() {
  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <hr />
      <h2>Published Courses (7)</h2>
      <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div className="col" style={{ width: "300px" }}>
              <div className="card">
                <img
                  src={course.image}
                  className="card-img-top"
                  style={{ maxHeight: "150px" }}
                />
                <div className="card-body">
                  <Link
                    className="card-title"
                    to={`/Kanbas/Courses/${course._id}`}
                    style={{
                      textDecoration: "none",
                      color: "navy",
                      fontWeight: "bold",
                    }}
                  >
                    {course.number}
                  </Link>
                  <p className="card-text">{course.name}</p>
                  <Link to={`/Kanbas/Courses/${course._id}`} className="btn btn-primary">
                    {" "}
                    Go{" "}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <pre>
        <code>{JSON.stringify(courses, null, 2)}</code>!
      </pre>
    </div>
  );
}

export default Dashboard;
