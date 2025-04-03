import { useState } from "react";

export default function CommentForm({ postId, onCommentAdded, token }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/api/comments/post/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    });

    if (res.ok) {
      const newComment = await res.json();
      onCommentAdded(newComment);
      setContent("");
    } else {
      alert("Failed to add comment.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        rows={3}
        required
      />
      <button type="submit">Add Comment</button>
    </form>
  );
}
