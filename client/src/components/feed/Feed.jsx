import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useState, useEffect } from "react";
import axios from "axios";

function Feed({ username }) {
  console.log(username);
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await axios.get(
  //       "/api/posts/timeline/63e29b38276597f246e22c07"
  //     );
  //     setPosts(res.data);
  //   };
  //   fetchPosts();
  // }, []);

  // /api/users/63e29b38276597f246e22c07
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/api/posts/profile/${username}`)
        : await axios.get("/api/posts/timeline/63e29b38276597f246e22c07");
      setPosts(res.data);
    };
    fetchPosts();
  }, [username]);

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
