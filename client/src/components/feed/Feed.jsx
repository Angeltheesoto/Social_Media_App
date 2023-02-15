import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Feed({ username }) {
  console.log(username);
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  // /api/users/63e29b38276597f246e22c07
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/api/posts/profile/${username}`)
        : await axios.get("/api/posts/timeline/" + user._id);
      setPosts(res.data);
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
