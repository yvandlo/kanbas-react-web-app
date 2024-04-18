import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/moduleReducer";
import quizzesReducer from "../Courses/Quizzes/quizReducer";
export interface KanbasState {
    modulesReducer: {
        modules: any[];
        module: any;
    };
    quizzesReducer: {
        quizzes: any[];
        quiz: any;
    };
}
const store = configureStore({
    reducer: {
        modulesReducer,
        quizzesReducer
    }
});


export default store;