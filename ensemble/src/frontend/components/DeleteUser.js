import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { UserDataContext } from "../context/userDataContext";

function DeleteUser(props) {
  const navigate = useNavigate();

  const { logUserData } = useContext(UserDataContext);

  //  useEffect(() => {
  //    axios
  //      .delete(`http://localhost:3005/secapp/delete/${logUserData._id}`)
  //      .then((response) => console.log(response.data));
  //  });

  return (
    <div>
      <div className="userdeleted">
        <h2>User has been deleted</h2>
      </div>
    </div>
  );
}

export default DeleteUser;
