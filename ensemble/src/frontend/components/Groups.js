import React, { useEffect, useContext } from "react";
import { UserDataContext } from "../context/userDataContext";
import { GroupDataContext } from "../context/groupDataContext";
import { ThreadContext } from "../context/threadContext";
import { Link } from "react-router-dom";

function Groups(props, i) {
  const { logGroupData } = useContext(GroupDataContext);
  const { logThreadData } = useContext(ThreadContext);
  const { logUserData } = useContext(UserDataContext);

  useEffect(() => {}, []);

  return (
    <div className="container">
      <div>
        <h3>Groups</h3>
        <div className="groups">
          <GroupDataContext />
        </div>
      </div>
    </div>
  );
}

export default Groups;
