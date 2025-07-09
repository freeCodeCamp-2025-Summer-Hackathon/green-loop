import React, { useEffect, useContext } from "react";
import { UserDataContext } from "../context/userDataContext";
import { Link } from "react-router-dom";
function User(props) {
  const { logUserData } = useContext(UserDataContext);

  const userId = logUserData._id;

  useEffect(() => {}, []);

  return (
    <div className="">
      <div className="profile">
        <div>
          <img className="profilePic" onScroll={logUserData.thumbnail} alt="" />
          <div className="">
            <h4>{logUserData.first_name}</h4>
          </div>
        </div>
        <div className="aboutMe">
          <h1>About Me</h1>
          <p>
            <span>Bio:</span>
          </p>
          <div>
            <h4>Welcome, {logUserData.user_name} </h4>
            <span className="">Groups you are in:{logUserData.in_groups}</span>
          </div>
          <div>
            <Link to="/UpdateUser" value={{ userId }}>
              <button>Update Profile</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
