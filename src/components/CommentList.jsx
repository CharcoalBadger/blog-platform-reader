export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>
          <strong>{comment.author}:</strong> {comment.content}
        </li>
      ))}
    </ul>
  );
}
