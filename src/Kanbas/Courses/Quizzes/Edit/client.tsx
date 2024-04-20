import axios from "axios";
axios.defaults.withCredentials = true
//const COURSES_API = "http://localhost:4000/api/courses";
//const Questions_API = "http://localhost:4000/api/Questions";
//const COURSES_API = "https://kanbas-node-server-app-566o.onrender.com/api/courses";
//const Questions_API = "https://kanbas-node-server-app-566o.onrender.com/api/Questions";
const API_BASE = process.env.REACT_APP_API_BASE;
const QUESTIONS_API = `${API_BASE}/api/questions`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;

export const deleteQuestion = async (questionId) => {
    const response = await axios
        .delete(`${QUESTIONS_API}/${questionId}`);
    return response.data;
};

export const createQuestion = async (quizId, question) => {
    const response = await axios.post(
        `${QUIZZES_API}/${quizId}/questions`,
        question
    );
    return response.data;
};

export const updateQuestion = async (question) => {
    const response = await axios.
        put(`${QUESTIONS_API}/${question._id}`, question);
    return response.data;
};

export const findQuestionById = async (questionId) => {
    const response = await axios
        .get(`${QUESTIONS_API}/${questionId}`);
    return response.data;
};

export const findQuestionsForQuiz = async (courseId) => {
    const response = await axios
        .get(`${QUIZZES_API}/${courseId}/questions`);
    return response.data;
};
