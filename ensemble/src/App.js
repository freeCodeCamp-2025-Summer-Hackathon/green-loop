import "./App.css";
import "./index.js";
import {
  Navigation,
  Home,
  Login,
  Signup,
  User,
  UpdateUser,
  DeleteUser,
  Groups,
} from "./frontend/components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { SignUp } from "./frontend/components";
import { SearchDataContext } from "./frontend/context/searchDataContext";
import { ThreadContext } from "./frontend/context/threadContext";
import { UserDataContext } from "./frontend/context/userDataContext";
import { GroupDataContext } from "./frontend/context/groupDataContext";

function App() {
  const [groupData, setGroupData] = useState([]);
  const [threadData, setThreadData] = useState([]);
  const [logUserData, setLogUserData] = useState([]);

  //welcome user
  const [welcomeUser, setWelcomeUser] = useState("Please log in");
  const logInLogOut = true;
  //    welcomeUser === "Please log in" ? (
  //      <a href="/Login">.</a>
  //    ) : (
  //      <a href="/Signup">.</a>
  //    );

  return (
    <div className="App">
      {logInLogOut}
      <UserDataContext.Provider value={{ logUserData, setLogUserData }}>
        <GroupDataContext.Provider value={groupData}>
          <ThreadContext.Provider value={threadData}>
            <Router>
              <Navigation loggedIn={logInLogOut} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home user={welcomeUser} />} />
                <Route
                  path="/Login"
                  element={<Login setWelcomeUser={setWelcomeUser} />}
                />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/User" element={<User />} />
                <Route path="/DeleteUser" element={<DeleteUser />} />
                <Route path="/UpdateUser" element={<UpdateUser />} />
                <Route path="/Groups" element={<Groups />} />
              </Routes>
            </Router>
          </ThreadContext.Provider>
        </GroupDataContext.Provider>
      </UserDataContext.Provider>
    </div>
  );
}

export default App;
