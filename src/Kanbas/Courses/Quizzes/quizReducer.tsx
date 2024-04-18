import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    quizzes: [],
    quiz: { title: "New Quiz 123", description: "New Description" },
};


const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },

        addQuiz: (state, action) => {
            state.quizzes = [
                action.payload,
                ...state.quizzes,
            ];
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter(
                (module) => module._id !== action.payload
            );
        },
        updateQuiz: (state, action) => {
            state.quizzes = state.quizzes.map((module) => {
                if (module._id === action.payload._id) {
                    return action.payload;
                } else {
                    return module;
                }
            });
        },
        setQuiz: (state, action) => {
            state.quiz = action.payload;
        },
    },
});


export const { setQuizzes, setQuiz,
    deleteQuiz, updateQuiz, addQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;