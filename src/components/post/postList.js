import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null); // Track which post's replies are visible
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  const toggleReplies = (postId) => {
    setExpandedPostId((prev) => (prev === postId ? null : postId));
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="p-4 border rounded shadow-md">
          <p className="font-bold">{post.title || "Post"}</p>
          <p>{post.text || post.content}</p>
          <button
            className="text-blue-500"
            onClick={() => toggleReplies(post._id)}
          >
            {expandedPostId === post._id ? "Hide Replies" : "View Replies"}
          </button>
          {expandedPostId === post._id && (
            <div className="mt-2 space-y-2">
              {post.replies.length > 0 ? (
                post.replies.map((reply) => (
                  <div
                    key={reply._id}
                    className="p-2 border rounded shadow-sm bg-gray-100"
                  >
                    <p>{reply.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No replies yet.</p>
              )}
            </div>
          )}
          <button
            className="text-green-500 mt-2"
            onClick={() => navigate(`/student/post/${post._id}`)}
          >
            Open Post
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
