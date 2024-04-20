import React, { useState } from "react";
import { Link } from "react-router-dom";
import QuestionList from "./QuestionList";
function QuizQuestionEditor() {
    return (
        <>
            <h1>Questions</h1>
            <QuestionList />
        </>
    );
}
export default QuizQuestionEditor;