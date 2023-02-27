import { Link } from "react-router-dom";
import "./closeFriend.css";

const CloseFriend = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link
      to={"/profile/" + user.username}
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      <li className="leftbarFriend">
        {/* <img src={PF + user.profilePicture} alt="" className="leftbarFriendImg" /> */}
        <img
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
          className="leftbarFriendImg"
        />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    </Link>
  );
};

export default CloseFriend;
