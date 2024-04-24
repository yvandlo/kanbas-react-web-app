import React, { useEffect, useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaBan } from "react-icons/fa";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import * as client from "./client";
import {
    setQuizzes, setQuiz,
    deleteQuiz, updateQuiz, addQuiz
} from "./quizReducer";

function QuizList() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        client.findQuizzesForCourse(courseId)
            .then((quizzes) =>
                dispatch(setQuizzes(quizzes))
            );
        dispatch(setQuiz({ "title": "New Quiz", "description": "New Description" }));
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
    const handleAddQuiz = async () => {
        const response = client.createQuiz(courseId,
            { "title": quiz.title, "description": quiz.description });
        dispatch(addQuiz(response));
        return response;
    };


    const quizList = useSelector((state: KanbasState) =>
        state.quizzesReducer.quizzes);
    const quiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);
    const dispatch = useDispatch();

    const handlePublishQuiz = async (quizId: string) => {
        const toPublish = quizList.find((quiz) => quiz._id === quizId);
        console.log("toPublish", toPublish);
        handleUpdateQuiz({ ...toPublish, published: !(toPublish.published) });
    };

    const belowString = (quizT) => {
        const current = new Date().getDate();
        const available = new Date(quizT.availableDate).getDate();
        const until = new Date(quizT.untilDate).getDate();
        return ((current < available) ?
            "Not available until: " + quizT.availableDate :
            (current > until) ? "Closed" : "Available")
            + " | Due: " + quizT.dueDate + " | " + quizT.points + " points | Number of Questions: " + quizT.numquestions;

    }

    const quizNonsense = () => {
        return (
            <>
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
            </>
        )
    }

    const addAndNavigate = async () => {
        const id = (await handleAddQuiz())["_id"];
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${id}/Details`);
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <button type="button" className="btn bg-danger"
                        onClick={() => addAndNavigate()}> Add</button>
                    <br />
                </div>
            </div >

            <ul className="list-group wd-quizzes">
                {quizList.filter((quiz) => quiz.course === courseId).map((quiz) => (
                    <li key={quiz._id}
                        className="list-group-item">
                        <div>

                            <Link className="btn bg-successs" to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Details`}>
                                {quiz.title}
                            </Link>

                            <span className="float-end">

                                <div className="dropdown">
                                    {quiz.published ? <FaCheckCircle className="text-success" /> :
                                        <FaPlusCircle className="ms-2" onClick={() => handlePublishQuiz(quiz._id)} />}
                                    <a className="dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false" data-target="#"> <FaEllipsisV className="ms-2" /> </a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li className="dropdown-item">
                                            <Link className="btn bg-successs w-100" to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Details`}>
                                                Edit
                                            </Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <button type="button" className="btn w-100" onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
                                        </li>
                                        <li className="dropdown-item">
                                            <button type="button" className="btn w-100" onClick={() => handlePublishQuiz(quiz._id)}>{quiz.published ? <>Unpublish</> : <>Publish</>}</button>
                                        </li>
                                    </ul>
                                </div>
                            </span>
                            <br />
                            <FaEllipsisV className="me-2" />
                            {belowString(quiz)}
                        </div>
                    </li >
                ))
                }
            </ul >
        </>
    );
}
export default QuizList;