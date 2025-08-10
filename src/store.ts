import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from './reducers/todoSlice'
export const store = configureStore({
    reducer: {
        todo: TodoSlice 
    }
})