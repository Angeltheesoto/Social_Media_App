import axios from "axios";
import { useEffect, useState } from "react";
import "./conversations.css";

function Conversations({ conversations, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversations.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/api/users?userId=" + friendId);
        setUser(res.data);
        // !come back here, response is not showing in console.
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversations]);
  console.log(user);

  return (
    <div className="conversation">
      <img
        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user.username}</span>
    </div>
  );
}

export default Conversations;
