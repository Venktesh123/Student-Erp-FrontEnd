import React, { useState, useEffect } from "react";
import axios from "axios";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Create Axios instance
  const axiosInstance = axios.create({
    baseURL: "https://student-erp-y1qw.vercel.app/api", // Replace with your backend API base URL
  });

  // Add Authorization header to all requests
  useEffect(() => {
    const addAuthInterceptor = () => {
      const interceptor = axiosInstance.interceptors.request.use(
        (req) => {
          const user = localStorage.getItem("user");
          if (user) {
            const token = JSON.parse(user).token;
            req.headers.Authorization = `Bearer ${token}`;
          }
          return req;
        },
        (error) => Promise.reject(error)
      );

      // Cleanup interceptor when component unmounts
      return () => axiosInstance.interceptors.request.eject(interceptor);
    };

    addAuthInterceptor();
  }, [axiosInstance]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setSuccess(null); // Reset success state

    if (!text.trim()) {
      setError("Post text cannot be empty.");
      return;
    }

    try {
      const response = await axiosInstance.post("/posts/create", { text });
      setText(""); // Clear the textarea
      setSuccess("Post created successfully!");
    } catch (err) {
      setError(
        err.response?.data?.message || "Error creating post. Please try again."
      );
      console.error(
        "Error creating post:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 border rounded focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Write your post..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
      {success && <p className="text-green-500 mt-4">{success}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CreatePost;
