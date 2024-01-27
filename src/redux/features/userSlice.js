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
            state.isAuthenticated = true;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        loadUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logoutUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = false;
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
        registerRequest: (state, action) => {
            state.loading = true;
        },
        registerSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        registerFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { loginRequest, loginFailure, loginSuccess, loadUser, logoutUser, getAllUserRequest, getAllUserSuccess, getAllUserFailure,registerFailure,registerRequest,registerSuccess } = userSlice.actions;

export default userSlice.reducer;
