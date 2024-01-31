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
        postUploadRequest: (state, action) => {
            state.loading = true;
            state.postComplete = false;
        },
        postUploadSuccess: (state, action) => {
            state.loading = false;
            state.post = action.payload;
            state.postComplete = true;
        },
        postUploadFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload;
        },
        likeRequest: (state) => {
            state.likeLoading = true;
        },
        likeSuccess: (state, action) => {
            state.likeLoading = false;
            state.like = action.payload;
            
        },
        likeFailure: (state, action) => {
            state.likeLoading = false,
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null
        },
        clearMessage: (state) => {
            state.message = null
        },
        commentRequest: (state, action) => {
            state.commentLoading = true;
        },
        commentSuccess: (state, action) => {
            state.user = action.payload;
            state.commentLoading = false;
        },
        commentFailure: (state, action) => {
            state.error = action.payload;
            state.commentLoading = false;
        },
    }
});

export const { postRequest, postSuccess, postFailure,postUploadRequest, postUploadSuccess, postUploadFailure, likeFailure, likeRequest, likeSuccess,commentRequest,commentSuccess,commentFailure } = postSlice.actions;
export default postSlice.reducer;
