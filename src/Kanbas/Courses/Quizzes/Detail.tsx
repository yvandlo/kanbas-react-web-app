import React, { useEffect, useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaBan } from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import * as client from "./client";
import {
    setQuizzes, setQuiz,
    deleteQuiz, updateQuiz, addQuiz
} from "./quizReducer";

function QuizDetails() {
    const { courseId, quizId } = useParams();
    useEffect(() => {
        client.findQuizzesForCourse(courseId)
            .then((quizzes) => {
                dispatch(setQuizzes(quizzes));

            });
    }, [courseId]);

    const dispatch = useDispatch();
    const quizList = useSelector((state: KanbasState) =>
        state.quizzesReducer.quizzes);
    const quiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);
    console.log(quizList);
    dispatch(setQuiz(quizList.find((quiz) => quiz._id === quizId)));
    console.log(quiz);

    const handlePublishQuiz = async (quizId: string, publish: boolean) => {
        const toPublish = quizList.find((quiz) => quiz._id === quizId);
        const updatedQuiz = { ...toPublish, published: publish };
        const status = await client.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(updatedQuiz));
    };

    return (
        <>
            {quiz != null && quiz._id == quizId ? //quizList.filter((quiz) => quiz._id === quizId).map((quiz) => (
                <>
                    <h2>{quiz.title}</h2>
                    <button type="button" className={`btn ${quiz.published ? "bg-danger" : "bg-success"}`} onClick={() => handlePublishQuiz(quiz._id, !quiz.published)}>
                        {quiz.published ? <>UnPublish</> : <>Publish</>}</button>
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Edit`} className="btn">Edit</Link>
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Preview`} className="btn">Preview</Link>
                    <hr />
                    Quiz Type - {quiz.quiztype}
                    <br /> Points - {quiz.points}
                    <br /> Assignment Group - {quiz.assignmentgroup}
                    <br /> Shuffle Answers - {quiz.shuffleanswers ? <>Yes</> : <>No</>}
                    <br /> Time Limit - {quiz.timelimit}
                    <br /> Multiple Attempts -{quiz.multipleattempts ? <>Yes</> : <>No</>}
                    <br /> Show Correct Answers - {quiz.showcorrectanswers ? <>Yes</> : <>No</>}
                    <br /> Access Code - {quiz.accesscode === "" ? <>None</> : quiz.accesscode}
                    <br /> One Question at a Time - {quiz.onequestionatatime ? <>Yes</> : <>No</>}
                    <br /> Webcam Required - {quiz.webcamrequired ? <>Yes</> : <>No</>}
                    <br /> Lock Questions After Answering - {quiz.lockquestionsafteranswering ? <>Yes</> : <>No</>}
                    <br /> Due date - {quiz.hasOwnProperty("dueDate") ? quiz.dueDate : <>None</>}
                    <br /> Available date - {quiz.hasOwnProperty("availableDate") ? quiz.availableDate : <>None</>}
                    <br /> Until date - {quiz.hasOwnProperty("untilDate") ? quiz.untilDate : <>None</>}
                </> : <></>
            }
        </>
    );
}
export default QuizDetails;