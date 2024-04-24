import React, { useEffect, useState } from "react";
import "./../index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaBan } from "react-icons/fa";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as client from "./../client";
import {
    setQuizzes, setQuiz,
    deleteQuiz, updateQuiz, addQuiz
} from "./../quizReducer";

function QuizDetailsEditor() {
    const { courseId, quizId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        client.findQuizzesForCourse(courseId)
            .then((quizzes) => {
                dispatch(setQuizzes(quizzes));
                dispatch(setQuiz(quizzes.find((quiz) => quiz._id === quizId)));
            });
    }, [courseId]);

    const dispatch = useDispatch();
    const quizList = useSelector((state: KanbasState) =>
        state.quizzesReducer.quizzes);
    const quiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);


    const saveAndPublish = async () => {
        const status = await client.updateQuiz(quiz);
        await client.publishQuiz(quizId);
        //dispatch(updateQuiz(quiz));
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    };

    const handleUpdateQuiz = async () => {
        const status = await client.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Details`);
    };


    const textInput = (field: string, inputType: string) => (
        <input value={quiz[field]} type={inputType}
            onChange={(e) =>
                dispatch(setQuiz({ ...quiz, [field]: e.target.value }))} />
    );

    const booleanInput = (field: string) => (
        <input checked={quiz[field]} type="checkbox"
            onChange={(e) =>
                dispatch(setQuiz({ ...quiz, [field]: !quiz[field] }))} />
    );

    const selectionInput = (field: string, options: string[]) => {
        //const useValue = options.includes(quiz[field]) ? quiz[field] : options[0];
        //dispatch(setQuiz({ ...quiz, [field]: useValue }));
        return (
            <select defaultValue={options.includes(quiz[field]) ? quiz[field] : options[0]}
                onChange={(e) =>
                    dispatch(setQuiz({ ...quiz, [field]: e.target.value }))}>
                {options.map((type, count) => (
                    <option key={count} value={type}>{type}</option>
                ))}
            </select>
        )
    };

    const typeOptions = ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"]
    const assignmentGroups = ["Quizzes", "Exams", "Assignments", "Project"]

    return (
        <>
            {quiz != null && quiz._id == quizId ? //quizList.filter((quiz) => quiz._id === quizId).map((quiz) => (
                <>
                    <button type="button" className="btn bg-success" onClick={() => handleUpdateQuiz()}>
                        Save
                    </button>
                    <button type="button" className="btn bg-success" onClick={() => saveAndPublish()}>
                        Save and Publish
                    </button>
                    <Link className="btn bg-successs" to={`/Kanbas/Courses/${courseId}/Quizzes`}>
                        Cancel
                    </Link>
                    <hr />
                    Quiz Title -

                    {textInput("title", "text")}
                    <br /> Quiz Description -
                    {textInput("description", "text")}
                    <br /> Quiz Type -
                    {selectionInput("quiztype", typeOptions)}
                    <br /> Points - {textInput("points", "number")}
                    <br /> Assignment Group -
                    {selectionInput("assignmentgroup", assignmentGroups)}
                    <br /> <label>Shuffle Answers - {booleanInput("shuffleanswers")}</label>
                    <br /> Time Limit - {textInput("timelimit", "number")}
                    <br /> <label>Multiple Attempts - {booleanInput("multipleattempts")}</label>
                    <br /> <label>Show Correct Answers - {booleanInput("showcorrectanswers")}</label>
                    <br /> Access Code - {textInput("accesscode", "text")}
                    <br /> <label>One Question at a Time - {booleanInput("onequestionatatime")}</label>
                    <br /> <label>Webcam Required - {booleanInput("webcamrequired")}</label>
                    <br /> <label>Lock Questions After Answering - {booleanInput("lockquestionsafteranswering")}</label>
                    <br /> Due date - {textInput("dueDate", "date")}
                    <br /> Available date -  {textInput("availableDate", "date")}
                    <br /> Until date - {textInput("untilDate", "date")}
                </> : <></>
            }
        </>
    );
}
export default QuizDetailsEditor;