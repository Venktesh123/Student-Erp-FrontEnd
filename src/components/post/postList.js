import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
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

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="p-4 border rounded shadow-md">
          <p>{post.text}</p>
          <button
            className="text-blue-500"
            onClick={() => navigate(`/student/post/${post._id}`)}
          >
            View Replies
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
