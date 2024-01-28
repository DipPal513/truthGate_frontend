import { configureStore } from '@reduxjs/toolkit';
import userReducer from "@/redux/features/userSlice";
import postReducer from "@/redux/features/postSlice";

const initialState = {};
const store = configureStore({
    initialState,
    reducer: {
        user: userReducer,
        post: postReducer
    }
});


export default store;