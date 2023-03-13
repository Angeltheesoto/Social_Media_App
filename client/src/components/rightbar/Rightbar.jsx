import React, { useContext, useEffect, useRef, useState } from "react";
import "./rightbar.css";
// import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { logoutCall } from "../../apiCalls";
import EditProfile from "../editProfile/EditProfile";

function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );
  const [show, setShow] = useState(false);
  const description = useRef();

  console.log(user);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendsList = await axios.get("/api/users/friends/" + user._id);
        setFriends(friendsList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const showEditForm = () => {
    setShow((prev) => !prev);
  };

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/api/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/api/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = () => {
    logoutCall(dispatch);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="/assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img src="/assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendsList">
          {/* {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))} */}
          {friends.map((friends) => (
            <Online key={friends._id} user={friends} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => {
            return (
              <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
              >
                <div className="rightbarFollowing" key={user._id}>
                  <img
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        {user.username === currentUser.username && (
          <button className="rightbarLogoutButton" onClick={showEditForm}>
            <p>Edit Profile</p>
          </button>
        )}
        {user.username === currentUser.username && (
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <button className="rightbarLogoutButton" onClick={logOut}>
              <p>Log out</p>
            </button>
          </Link>
        )}
        {/* Create another handleClick function that updates the users info to the appropriate route in users.js
        You need the users id and password to edit your own. 
        */}
        {show && (
          <form className="editFormBox">
            Description:
            <input placeholder="description" type="text" ref={description} />
            <button>Confirm</button>
          </form>
        )}
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar;
