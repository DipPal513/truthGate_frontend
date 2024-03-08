import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRequest: (state, action) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.loggedIn = true;
            state.isAuthenticated = true;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        loadUserRequest: (state) => {
            state.initialLoading = true;
        },
        loadUser: (state, action) => {
            state.user = action.payload;
            state.initialLoading = false;
            state.isAuthenticated = true;
        },
        loadUserFailure: (state, action) => {
            state.initialLoading = false;
            state.isAuthenticated = false;
        },

        logoutUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = false;
            state.posts = null
        },
        getAllUserRequest: (state, action) => {
            state.loading = true;
        },
        getAllUserSuccess: (state, action) => {
            state.allUsers = action.payload;
            state.loading = false;
        },
        getAllUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        followRequest: (state, action) => {
            state.followLoading = true;
        },
        followSuccess: (state, action) => {
            state.follow = action.payload;
            state.followLoading = false;
        },
        followFailure: (state, action) => {
            state.error = action.payload;
            state.followLoading = false;
        },
        registerRequest: (state, action) => {
            state.loading = true;
        },
        registerSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.isAuthenticated = true;
        },
        registerFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.isAuthenticated = false;
        }
        ,
        
    }
});

export const { loginRequest, loginFailure, loginSuccess, loadUser, logoutUser, getAllUserRequest, getAllUserSuccess, getAllUserFailure, registerFailure, registerRequest, registerSuccess, followSuccess, followRequest, followFailure, loadUserFailure, loadUserRequest} = userSlice.actions;

export default userSlice.reducer;
