import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    questions: [],
    question: { title: "New Question 123" },
    editing: [],
};


const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {

        startEditing: (state, action) => {
            if (!state.editing.includes(action.payload)) {
                state.editing = [...state.editing, action.payload];
            }
        },

        clearEditing: (state) => {
            state.editing = [];
        },

        stopEditing: (state, action) => {
            state.editing = state.editing.filter(
                (module) => module._id === action.payload
            );
        },

        setQuestions: (state, action) => {
            state.questions = action.payload;
        },

        addQuestion: (state, action) => {
            state.questions = [
                action.payload,
                ...state.questions,
            ];
        },
        deleteQuestion: (state, action) => {
            state.questions = state.questions.filter(
                (module) => module._id !== action.payload
            );
        },
        updateQuestion: (state, action) => {
            state.questions = state.questions.map((module) => {
                if (module._id === action.payload._id) {
                    return action.payload;
                } else {
                    return module;
                }
            });
        },
        setQuestion: (state, action) => {
            state.question = action.payload;
        },
    },
});


export const { startEditing, stopEditing, clearEditing, setQuestions, setQuestion,
    deleteQuestion, updateQuestion, addQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;