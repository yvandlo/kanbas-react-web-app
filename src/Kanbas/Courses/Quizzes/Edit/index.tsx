import React, { useEffect, useState } from "react";
import DetailsEditor from './DetailsEditor';
import QuestionEditor from './QuestionEditor';
import { Navigate, Route, Routes, useParams, useLocation, Link } from "react-router-dom";

function QuizEditor() {
    const { pathname } = useLocation();
    return (
        <div>
            <nav className="nav nav-tabs mt-2">
                <Link to="Details"
                    className={`nav-link ${pathname.includes("Detail") ? "active" : ""}`}>Details</Link>
                <Link to="Questions"
                    className={`nav-link ${pathname.includes("Question") ? "active" : ""}`}>Questions</Link>
            </nav>
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="Details" />} />
                    <Route path="/Details" element={<DetailsEditor />} />
                    <Route path="/Questions" element={<QuestionEditor />} />
                </Routes>
            </div>
        </div>
    );
}
export default QuizEditor;