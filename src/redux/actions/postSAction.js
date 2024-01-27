import React from 'react'
import { useDispatch } from 'react-redux';
import { postFailure, postRequest, postSuccess } from '../features/postSlice';
import axios from 'axios';

export const getFollowingPosts = () => async (dispatch) => {
    try {
        dispatch({
            type: "postRequest",
        });

        const { data } = await axios.get("/api/v1/posts");
        dispatch({
            type: "postSuccess",
            payload: data.posts,
        });
    } catch (error) {
        dispatch({
            type: "postFailure",
            payload: error.message,
        });
    }
};
