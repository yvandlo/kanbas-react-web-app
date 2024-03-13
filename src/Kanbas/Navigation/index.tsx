import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt } from "react-icons/fa";
function KanbasNavigation() {
    const links = [
        { label: "Account", icon: <FaRegUserCircle className="fs-2" /> },
        { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
        { label: "Courses", icon: <FaBook className="fs-2" /> },
        { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
    ];
    const { pathname } = useLocation();
    return (
        <ul className="wd-kanbas-navigation">
            <li><a href="http://northeastern.edu"><img src="/images/NUlogo.png" height="50px" /><br /></a></li>
            {links.map((link, index) => (
                <li key={index} className={pathname.includes(link.label) ? "wd-active" : link.label === "Account" ? "wd-kanbas-account" : ""}>
                    <Link to={`/Kanbas/${link.label}`}> {link.icon} {link.label} </Link>
                </li>
            ))}
        </ul>
    );
}
export default KanbasNavigation;