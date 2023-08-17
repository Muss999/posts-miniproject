import React, { useEffect } from "react";
import PostItem from "./PostItem";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUser } from "../store/postsSlice";

const PostsList = () => {
    const { posts, error, loading, user, selectedPost } = useSelector(
        (state) => state.posts
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, []);

    return (
        <>
            {error ? (
                <div>
                    <h3>Something went wrong!</h3>
                </div>
            ) : (
                <div className="card__list">
                    {loading && <h3>Loading...</h3>}
                    {posts.map((post, index) => (
                        <PostItem key={index} post={post} />
                    ))}
                </div>
            )}
        </>
    );
};

export default PostsList;
