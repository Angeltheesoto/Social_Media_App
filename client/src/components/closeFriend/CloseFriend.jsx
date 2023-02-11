import "./closeFriend.css";

const CloseFriend = ({ user }) => {
  return (
    <li className="leftbarFriend">
      <img src={user.profilePicture} alt="" className="leftbarFriendImg" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};

export default CloseFriend;
