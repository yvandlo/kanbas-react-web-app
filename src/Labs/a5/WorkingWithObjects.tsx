import React, { useEffect, useState } from "react";
import axios from "axios";
function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const [module, setModule] = useState({
    id: "M101",
    name: "Full stack development",
    description: "Full stack is the development to develop",
    course: "CS1234"
  });
  const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment"
  const MODULE_URL = "http://localhost:4000/a5/module"
  const fetchAssignment = async () => {
    const response = await axios.get(`${ASSIGNMENT_URL}`);
    setAssignment(response.data);
  };
  const updateTitle = async () => {
    const response = await axios
      .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
    setAssignment(response.data);
  };
  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
    <div>
      <h3>Working With Objects</h3>
      <h3>Modifying Properties</h3>
      <input onChange={(e) => setAssignment({
        ...assignment, title: e.target.value
      })}
        value={assignment.title} type="text" />
      <button onClick={updateTitle} >
        Update Title to: {assignment.title}
      </button>
      <button onClick={fetchAssignment} >
        Fetch Assignment
      </button>

      <h4>On your Own</h4>
      <a href={`${MODULE_URL}`}>
        Get Module
      </a>
      <br />
      <a href={`${MODULE_URL}/name`}>
        Get Module Name
      </a>
      <br />
      <input type="text"
        onChange={(e) => setModule({
          ...module,
          name: e.target.value
        })}
        value={module.name} />
      <br />
      <a href={`${MODULE_URL}/name/${module.name}`}>
        Update Module Name
      </a>
      <h4>Modifying Properties</h4>
      <a href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <input type="text"
        onChange={(e) => setAssignment({
          ...assignment,
          title: e.target.value
        })}
        value={assignment.title} />
      <br />
      <a href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
        Update Score
      </a>
      <input type="number"
        onChange={(e) => setAssignment({
          ...assignment,
          score: parseInt(e.target.value)
        })}
        value={assignment.score} />
      <br />
      <a href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}>
        Update Completed
      </a>
      <input type="checkbox"
        onChange={(e) => setAssignment({
          ...assignment,
          completed: !assignment.completed
        })}
        checked={assignment.completed} />
      <h4>Retrieving Objects</h4>
      <a href="http://localhost:4000/a5/assignment">
        Get Assignment
      </a>
      <h4>Retrieving Properties</h4>
      <a href="http://localhost:4000/a5/assignment/title">
        Get Title
      </a>
    </div>
  );
}
export default WorkingWithObjects;