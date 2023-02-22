import axios from "axios";
import { useEffect, useState } from "react";
import "./conversations.css";

function Conversations({ conversations, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const friendId = conversations.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/api/users?userId=" + friendId);
        setUser(res.data);
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversations]);

  return (
    <div className="conversation">
      <img
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">
        {user?.username ? user.username : "Loading.."}
      </span>
    </div>
  );
}

export default Conversations;
