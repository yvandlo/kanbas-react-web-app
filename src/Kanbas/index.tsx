import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router";

function Kanbas() {
   return (
      <div className="d-flex">
         <div>
            <KanbasNavigation />
         </div>
         <div style={{ flexGrow: 1 }}>
            <Routes>
               <Route path="/Account" element={<h1>Account</h1>} />
               <Route path="/Dashboard" element={<Dashboard />} />
               <Route path="/Courses/:courseId/*" element={<Courses />} />
               <Route path="/Calendar" element={<h1>Calendar</h1>} />
            </Routes>
         </div>
      </div>
   );
}
export default Kanbas;
