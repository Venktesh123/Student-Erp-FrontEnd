import { useState } from "react";
import axios from "axios";

const ReplyForm = ({ postId, onReplyAdded }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5001/api/posts/reply/${postId}`,
        { text }
      );
      setText("");
      if (onReplyAdded) {
        onReplyAdded(response.data); // Callback to update replies in parent
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-4 border rounded"
        placeholder="Write your reply..."
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Reply
      </button>
    </form>
  );
};

export default ReplyForm;
