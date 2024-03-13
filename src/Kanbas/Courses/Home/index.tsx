import ModuleList from "../Modules/List";
import { FaRegCalendarAlt, FaChartLine, FaBell } from "react-icons/fa";

function Home() {
    return (
        <div className="d-flex">
            <div className="flex-fill">
                <ModuleList />
            </div>
            <div className="flex-grow-0 me-2 d-none d-lg-block" style={{ width: "250px" }}>
                <hr />
                <button type="button" className="btn"><FaChartLine className="fs-1" /> View Course Stream</button>
                <button type="button" className="btn"><FaChartLine className="fs-1" /> New Analytics</button>
                <button type="button" className="btn"><FaRegCalendarAlt className="fs-1" /> View Course Calendar</button>
                <button type="button" className="btn"><FaBell className="fs-1" /> View Notifications</button>
                <h5>To Do</h5>
                <hr />
                <div className="row flex-fill">
                    <div className="col-auto">
                        <FaRegCalendarAlt className="fs-1" />
                    </div>
                    <div className="col-10">
                        Randome link to a thing for this class [BOS-1-TR]
                    </div>
                </div>

                <div className="row flex-fill">
                    <div className="col-auto">
                        <FaRegCalendarAlt className="fs-1" />
                    </div>
                    <div className="col-10">
                        Another random link to a class  [BOS-1-TR]
                    </div>
                </div>
            </div>

        </div >
    );
}
export default Home;