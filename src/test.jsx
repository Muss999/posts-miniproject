// postsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
});

export const fetchUser = createAsyncThunk("users/fetchUser", async (userId) => {
    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    return response.data;
});

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        selectedPost: null,
        user: null,
        loading: false,
    },
    reducers: {
        selectPost: (state, action) => {
            state.selectedPost = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const { selectPost } = postsSlice.actions;

export default postsSlice.reducer;

// store.js
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";

const store = configureStore({
    reducer: {
        posts: postsReducer,
    },
});

export default store;

// PostList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchUser, selectPost } from "./postsSlice";
import UserDetail from "./UserDetail";

const PostList = () => {
    const dispatch = useDispatch();
    const { posts, loading, selectedPost, user } = useSelector(
        (state) => state.posts
    );

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handlePostClick = async (postId, userId) => {
        dispatch(selectPost(postId));
        dispatch(fetchUser(userId));
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {posts.map((post) => (
                        <li
                            key={post.id}
                            onClick={() =>
                                handlePostClick(post.id, post.userId)
                            }
                        >
                            {post.title}
                        </li>
                    ))}
                </ul>
            )}
            {selectedPost && <UserDetail user={user} />}
        </div>
    );
};

export default PostList;

// UserDetail.js
import React from "react";

const UserDetail = ({ user }) => {
    if (!user) return null;

    return (
        <div>
            <h2>User Details</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Website: {user.website}</p>
        </div>
    );
};

export default UserDetail;

// App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import PostList from "./PostList";

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <h1>Posts App</h1>
                <PostList />
            </div>
        </Provider>
    );
};

export default App;
