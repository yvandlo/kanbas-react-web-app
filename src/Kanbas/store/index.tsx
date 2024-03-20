import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/moduleReducer";
export interface KanbasState {
    modulesReducer: {
        modules: any[];
        module: any;
    };
}
const store = configureStore({
    reducer: {
        modulesReducer
    }
});


export default store;