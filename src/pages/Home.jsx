import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { token, login, logout } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h1>📰 Blog Posts</h1>

      {!token && <LoginForm onLogin={login} />}
      {token && <button onClick={logout}>Log Out</button>}

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>by {post.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
