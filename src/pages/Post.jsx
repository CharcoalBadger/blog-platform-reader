import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import { AuthContext } from "../contexts/AuthContext";

export default function Post() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));

    fetch(`http://localhost:3000/api/comments/post/${id}`)
      .then(res => res.json())
      .then(data => setComments(data));
  }, [id]);

  const handleNewComment = (comment) => {
    setComments(prev => [...prev, comment]);
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>By User ID: {post.author_id}</p>
      <p>{post.content}</p>
      <hr />
      <h3>Comments</h3>
      <CommentList comments={comments} />
      {token && (
        <>
          <h4>Add a comment:</h4>
          <CommentForm postId={id} onCommentAdded={handleNewComment} token={token} />
        </>
      )}
    </div>
  );
}
