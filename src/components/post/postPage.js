import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostList from "./postList";
import ReplyForm from "./reply";
import CreatePost from "./createPost";

const PostPage = () => {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();

  // Toggle between PostList and CreatePost
  const handleCreatePostClick = () => {
    setIsCreateMode(true);
    navigate("/student/create/post"); // Ensure this route exists in your routing setup
  };

  const handleBackToPostList = () => {
    setIsCreateMode(false);
    navigate("/student/post");
  };

  return (
    <div>
      {!isCreateMode ? (
        <>
          <PostList />
          <button
            onClick={handleCreatePostClick}
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Create Post
          </button>
        </>
      ) : (
        <>
          <CreatePost />
          <button
            onClick={handleBackToPostList}
            className="bg-gray-500 text-white p-2 rounded mt-4"
          >
            Back to Post List
          </button>
        </>
      )}
      {postId && <ReplyForm postId={postId} />}
    </div>
  );
};

export default PostPage;
