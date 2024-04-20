import React, { useEffect, useState } from "react";
import "./../index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaBan } from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as client from "./client";
import * as quizClient from "./../client";
import {
    startEditing, stopEditing, clearEditing,
    setQuestions, setQuestion,
    deleteQuestion, updateQuestion, addQuestion
} from "./questionReducer";

function QuestionList() {
    const { courseId, quizId } = useParams();
    useEffect(() => {
        client.findQuestionsForQuiz(quizId)
            .then((questions) =>
                dispatch(setQuestions(questions))
            );
        dispatch(setQuestion({ "title": "New Title", "question": "New Question" }));
    }, [quizId]);

    const handleRefreshQuestion = async (questionId) => {
        const refreshQuestion = await client.findQuestionById(questionId);
        dispatch(updateQuestion(refreshQuestion));
    };

    const handleDeleteQuestion = (questionId: string) => {
        updateNumQuestions(-1);
        client.deleteQuestion(questionId).then((status) => {
            dispatch(deleteQuestion(questionId));
        });
        updatePointCount();
    };
    const handleUpdateQuestion = async (updatedQuestion) => {
        const status = await client.updateQuestion(updatedQuestion);
        dispatch(updateQuestion(updatedQuestion));
        updatePointCount();
    };
    const handleAddQuestion = () => {
        updateNumQuestions(1);
        client.createQuestion(quizId,
            { "title": question.title, "question": question.question })
            .then((question) => {
                dispatch(addQuestion(question))
            });
    };

    const updatePointCount = async () => {
        const totalPoints = await quizClient.totalPoints(quizId);
        console.log(totalPoints)
        quizClient.updatePoints(quizId, totalPoints);
    }

    const updateNumQuestions = async (relative) => {
        quizClient.updateNumQuestions(quizId, { points: questionList.length + relative });
    };

    const questionList = useSelector((state: KanbasState) =>
        state.questionsReducer.questions);
    const question = useSelector((state: KanbasState) =>
        state.questionsReducer.question);
    const editing = useSelector((state: KanbasState) =>
        state.questionsReducer.editing);
    const dispatch = useDispatch();

    const draw = (question) => {
        if (editing.includes(question._id)) {
            return drawEdit(question);
        } else {
            return drawNotEdit(question);
        }
    };

    const drawNotEdit = (question) => {
        return (
            <div>
                <h5>Title : {question.title}</h5>
                <h5>Question : {question.question}</h5>
                <h5>Points: {question.points}</h5>
                <h5>Type : {question.type}</h5>
                {drawNotEditType(question)}
                <button type="button" className="btn bg-primary"
                    onClick={() => dispatch(startEditing(question._id))}>
                    Edit
                </button>
            </div>
        );
    };

    const drawNotEditType = (question) => {
        switch (question.type) {
            case "Multiple Choice":
            case "Fill in the Blank":
                return drawList(question);
            case "True False":
                return <h5>Answer : {question.answer ? <>True</> : <>False</>}</h5>;
            default:
                return <div>Invalid Question Type</div>;
        }
    };

    const drawList = (question) => {
        return (
            <ul>
                {question.slots.map((slot, index) => (
                    <li key={index}>
                        {slot}{(question.type === "Multiple Choice" && index == question.correct) ? <FaCheckCircle /> : <></>}
                    </li>
                ))}
            </ul>
        )
    };

    const drawEdit = (question) => {
        return (
            <div>
                <button type="button" className="btn bg-danger"
                    onClick={() => {
                        handleDeleteQuestion(question._id);
                        dispatch(stopEditing(question._id));
                    }}>
                    Delete
                    <FaBan />
                </button><br />
                Title : {textInput(question, "title", "text")} <br />
                Points : {textInput(question, "points", "number")} <br />
                Question : {textInput(question, "question", "text")} <br />
                Type: {selectionInput(question, "type", questionTypes)} <br />
                {drawEditType(question)}
                <button type="button" className="btn bg-success"
                    onClick={() => {
                        handleUpdateQuestion(question);
                        dispatch(stopEditing(question._id));
                    }}>
                    Save
                </button>
                <button type="button" className="btn bg-danger"
                    onClick={() => {
                        handleRefreshQuestion(question._id);
                        dispatch(stopEditing(question._id));
                    }}>
                    Cancel
                </button>

            </div>

        )
    };

    const drawEditType = (question) => {
        switch (question.type) {
            case "Multiple Choice":
                return drawEditMultipleChoice(question);
            case "True False":
                return drawEditTrueFalse(question);
            case "Fill in the Blank":
                return drawEditFillInBlank(question);
            default:
                return <div>Invalid Question Type</div>;
        }
    }

    const drawEditTrueFalse = (question) => {
        return (
            <div>
                <label>
                    <h5><input type="radio" checked={question.answer === true}
                        onChange={(e) => {
                            dispatch(updateQuestion({ ...question, answer: true }));
                        }} />
                        True</h5>
                </label><br />
                <label>
                    <h5><input type="radio" checked={question.answer === false}
                        onChange={(e) => {
                            dispatch(updateQuestion({ ...question, answer: false }));
                        }} />
                        False</h5>
                </label>
            </div>
        );
    }

    const drawEditFillInBlank = (question) => {
        return (
            <ul>
                {question.slots.map((slot, index) => (
                    <li key={index}>
                        <input value={slot} type="text"
                            onChange={(e) => {
                                const newSlots = [...question.slots];
                                newSlots[index] = e.target.value;
                                dispatch(updateQuestion({ ...question, slots: newSlots }));
                            }} />
                        <button type="button" className="btn bg-danger"
                            onClick={() => {
                                const newSlots = [...question.slots];
                                newSlots.splice(index, 1);
                                dispatch(updateQuestion({ ...question, slots: newSlots }));
                            }}>Delete</button>
                    </li>
                ))}
                <li>
                    <button type="button" className="btn bg-success"
                        onClick={() => {
                            const newSlots = [...question.slots];
                            newSlots.push("To fill in");
                            dispatch(updateQuestion({ ...question, slots: newSlots }));
                        }}>Add Slot</button>
                </li>
            </ul>
        );
    }

    const drawEditMultipleChoice = (question) => {
        return (
            <ul>
                {question.slots.map((slot, index) => (
                    <li key={index}>
                        <textarea value={slot} //type="text"
                            onChange={(e) => {
                                const newSlots = [...question.slots];
                                newSlots[index] = e.target.value;
                                dispatch(updateQuestion({ ...question, slots: newSlots }));
                            }} />
                        <label> Correct
                            <input type="radio" checked={index === question.correct}
                                onChange={(e) => {
                                    dispatch(updateQuestion({ ...question, correct: index }));
                                }} />
                        </label>
                        <button type="button" className="btn bg-danger"
                            onClick={() => {
                                const newSlots = [...question.slots];
                                newSlots.splice(index, 1);
                                const newQuestion = { ...question, slots: newSlots };
                                if (question.correct === index) {
                                    newQuestion.correct = 0;
                                } else if (question.correct > index) {
                                    newQuestion.correct -= 1;
                                }
                                dispatch(updateQuestion(newQuestion));
                            }}>Delete</button>
                    </li>
                ))}
                <li>
                    <button type="button" className="btn bg-success"
                        onClick={() => {
                            const newSlots = [...question.slots];
                            newSlots.push("New Option");
                            dispatch(updateQuestion({ ...question, slots: newSlots }));
                        }}>Add Slot</button>
                </li>
            </ul>
        );
    }

    const textInput = (question, field: string, inputType: string) => (
        <input value={question[field]} type={inputType}
            onChange={(e) =>
                dispatch(updateQuestion({ ...question, [field]: e.target.value }))} />
    );

    const selectionInput = (question, field: string, options: string[]) => {
        //const useValue = options.includes(quiz[field]) ? quiz[field] : options[0];
        //dispatch(setQuiz({ ...quiz, [field]: useValue }));
        return (
            <select defaultValue={options.includes(question[field]) ? question[field] : options[0]}
                onChange={(e) =>
                    dispatch(updateQuestion({ ...question, [field]: e.target.value }))}>
                {options.map((type, count) => (
                    <option key={count} value={type}>{type}</option>
                ))}
            </select>
        )
    };

    const questionTypes = ["Multiple Choice", "True False", "Fill in the Blank"];

    const booleanInput = (field: string) => (
        <input checked={question[field]} type="checkbox"
            onChange={(e) =>
                dispatch(setQuestion({ ...question, [field]: !question[field] }))} />
    );

    return (
        <>
            <button type="button" className="btn bg-success" onClick={() => questionList.forEach((question) => { handleUpdateQuestion(question) })}>
                Save
            </button>
            <button type="button" className="btn bg-success" onClick={() => {
                questionList.forEach((question) => { handleUpdateQuestion(question) });
                quizClient.publishQuiz(quizId);
                dispatch(clearEditing());
            }}>
                Save and Publish
            </button>
            <Link className="btn bg-successs" to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Details`}>
                Cancel
            </Link>
            <div className="card">
                <div className="card-body">
                    <button type="button" className="btn bg-danger"
                        onClick={() => handleAddQuestion()}> Add</button>
                    <br />
                    <input className="form-control" value={question.title}
                        onChange={(e) => dispatch(setQuestion({
                            ...question, title: e.target.value
                        }))}
                    />
                    <textarea className="form-control" value={question.question}
                        onChange={(e) => dispatch(setQuestion({
                            ...question, question: e.target.value
                        }))}
                    />
                </div>
            </div >

            <ul className="list-group wd-questions">
                {questionList.filter((question) => question.quiz === quizId).map((question) => (
                    <li key={question._id}
                        className="list-group-item">
                        <div>
                            {draw(question)}

                        </div>
                    </li >
                ))
                }
            </ul >
        </>
    );
}
export default QuestionList;