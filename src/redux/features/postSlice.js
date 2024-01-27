import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    posts: []

}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        postRequest: (state, action) => {
            state.loading = true
        },
        postSuccess: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        },
        postFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload;
        },
        likeRequest: (state) => {
            state.loading = true;
        },
        likeSuccess: (state, action) => {
            state.loading = false;
            state.like = action.payload;
        },
        likeFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null
        },
        clearMessage: (state) => {
            state.message = null
        }
    }
});

export const { postRequest, postSuccess, postFailure, likeFailure, likeRequest, likeSuccess } = postSlice.actions;
export default postSlice.reducer;
