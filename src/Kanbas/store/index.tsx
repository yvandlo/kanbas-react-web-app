import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/moduleReducer";
import quizzesReducer from "../Courses/Quizzes/quizReducer";
import questionsReducer from "../Courses/Quizzes/Edit/questionReducer";

export interface KanbasState {
    modulesReducer: {
        modules: any[];
        module: any;
    };
    quizzesReducer: {
        quizzes: any[];
        quiz: any;
    };
    questionsReducer: {
        questions: any[];
        question: any;
        editing: any[];
    };
}
const store = configureStore({
    reducer: {
        modulesReducer,
        quizzesReducer,
        questionsReducer
    }
});


export default store;