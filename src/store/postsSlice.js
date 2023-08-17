import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
    let res = await axios(API);
    return res.data;
});

export const getUser = createAsyncThunk("users/getUser", async (userId) => {
    let res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    return res.data;
});

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        loading: false,
        user: null,
        error: null,
    },
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [getPosts.fulfilled]: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        },
        [getPosts.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [getUser.fulfilled]: (state, action) => {
            state.user = action.payload;
        },
    },
});
export default postsSlice.reducer;
