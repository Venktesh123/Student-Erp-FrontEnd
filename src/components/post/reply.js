import { useState } from "react";
import axios from "axios";

const ReplyForm = ({ postId, onReplyAdded }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState(null); // To display errors
  const [loading, setLoading] = useState(false); // To handle loading state

  // Get the JWT token from localStorage
  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors
    setLoading(true); // Set loading state to true

    if (!text.trim()) {
      setError("Reply text cannot be empty.");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `https://student-erp-y1qw.vercel.app/api/posts/reply/${postId}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request header
          },
        }
      );

      setText(""); // Clear the textarea
      if (onReplyAdded) {
        onReplyAdded(response.data); // Callback to parent with the new reply
      }
    } catch (err) {
      console.error("Error submitting reply:", err);
      setError(
        err.response?.data?.message ||
          "Failed to submit the reply. Please try again."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 border rounded focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Write your reply..."
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Submitting..." : "Reply"}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ReplyForm;
