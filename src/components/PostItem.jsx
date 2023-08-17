import React from "react";

const PostItem = ({ post, postClick }) => {
    // console.log(post);
    return (
        <div className="div123">
            <p>post's id: {post.id}</p>
            <p>UserId: {post.userId}</p>
            <button onClick={() => postClick(post.id, post.userId)}>
                User Info
            </button>
        </div>
    );
};

export default PostItem;
