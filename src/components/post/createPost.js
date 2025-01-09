// components/CreatePost.js
import { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/posts/create", { text });
      setText("");
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
        placeholder="Write your post..."
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
