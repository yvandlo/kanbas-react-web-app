import axios from "axios";
//const COURSES_API = "http://localhost:4000/api/courses";
//const Quizzes_API = "http://localhost:4000/api/Quizzes";
//const COURSES_API = "https://kanbas-node-server-app-566o.onrender.com/api/courses";
//const Quizzes_API = "https://kanbas-node-server-app-566o.onrender.com/api/Quizzes";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const Quizzes_API = `${API_BASE}/api/quizzes`;
export const deleteQuiz = async (quizId) => {
    const response = await axios
        .delete(`${Quizzes_API}/${quizId}`);
    return response.data;
};

export const createQuiz = async (courseId, quiz) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/quizzes`,
        quiz
    );
    return response.data;
};

export const updateQuiz = async (quiz) => {
    const response = await axios.
        put(`${Quizzes_API}/${quiz._id}`, quiz);
    return response.data;
};

export const publishQuiz = async (quizId) => {
    const response = await axios.
        put(`${Quizzes_API}/${quizId}/publish`);
    return response.data;
};

export const findQuizById = async (quizId) => {
    const response = await axios
        .get(`${Quizzes_API}/${quizId}`);
    return response.data;
};

export const findQuizzesForCourse = async (courseId) => {
    const response = await axios
        .get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};
