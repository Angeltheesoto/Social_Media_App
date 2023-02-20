import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";

import React, { useContext, useEffect, useState } from "react";
import Conversations from "../conversations/Conversations";
import Message from "../message/Message";
import ChatOnline from "../chatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/api/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for Friends"
              className="chatMenuInput"
            />
            {/* COME BACK HERE ERROR */}
            {conversations.map((c) => {
              <Conversations conversations={c} currentUser={user} />;
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message />
              <Message own={true} />
              <Message own={true} />
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write something..."
              ></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
