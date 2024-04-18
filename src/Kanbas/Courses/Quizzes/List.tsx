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

function QuizList() {
    const { courseId } = useParams();
    useEffect(() => {
        client.findQuizzesForCourse(courseId)
            .then((quizzes) =>
                dispatch(setQuizzes(quizzes))
            );
    }, [courseId]);

    const handleDeleteQuiz = (quizId: string) => {
        client.deleteQuiz(quizId).then((status) => {
            dispatch(deleteQuiz(quizId));
        });
    };
    const handleUpdateQuiz = async (updatedQuiz) => {
        const status = await client.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(updatedQuiz));
    };
    const handleAddQuiz = () => {
        client.createQuiz(courseId, quiz).then((quiz) => {
            dispatch(addQuiz(quiz));
        });
    };


    const quizList = useSelector((state: KanbasState) =>
        state.quizzesReducer.quizzes);
    const quiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);
    const dispatch = useDispatch();

    const handlePublishQuiz = async (quizId: string) => {
        const toPublish = quizList.find((quiz) => quiz._id === quizId);
        console.log("toPublish", toPublish);
        handleUpdateQuiz({ ...toPublish, published: true });
    };

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <button type="button" className="btn bg-danger"
                        onClick={() => handleAddQuiz()}> Add</button>
                    <br />
                    <input className="form-control" value={quiz.title}
                        onChange={(e) => dispatch(setQuiz({
                            ...quiz, title: e.target.value
                        }))}
                    />
                    <textarea className="form-control" value={quiz.description}
                        onChange={(e) => dispatch(setQuiz({
                            ...quiz, description: e.target.value
                        }))}
                    />
                </div>
            </div >

            <ul className="list-group wd-quizzes">
                {quizList.filter((quiz) => quiz.course === courseId).map((quiz) => (
                    <li key={quiz._id}
                        className="list-group-item">
                        <div>

                            <Link className="btn bg-successs" to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Edit`}>
                                {quiz.title}
                            </Link>

                            <span className="float-end">

                                <div className="dropdown">
                                    {quiz.published ? <FaCheckCircle className="text-success" /> :
                                        <FaPlusCircle className="ms-2" />}
                                    <a className="dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false" data-target="#"> <FaEllipsisV className="ms-2" /> </a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li className="dropdown-item">
                                            <Link className="btn bg-successs" to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Edit`}>
                                                Edit
                                            </Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <button type="button" className="btn" onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
                                        </li>
                                        <li className="dropdown-item">
                                            <button type="button" className="btn" onClick={() => handlePublishQuiz(quiz._id)}>Publish</button>
                                        </li>
                                    </ul>
                                </div>
                            </span>
                            <br />
                            <FaEllipsisV className="me-2" />
                            {quiz.description}
                        </div>
                    </li >
                ))
                }
            </ul >
        </>
    );
}
export default QuizList;