import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userDataContext";

function Login({ setWelcomeUser }) {
  let navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {}, []);

  const { setLogUserData } = useContext(UserDataContext);

  //  useEffect(() => {
  //    axios
  //      .get(`http://localhost:3005/serverapp/users`)
  //      .then((response) => setUserData(response.data));
  //  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginUser = "test@email.com"; //userData.find((user) = user.email === email));

    if (password === loginUser.password) {
      setLogUserData(loginUser);
      navigate("/User", { loginUser });
    } else {
      alert("Email/ or password are invalid. *Case Sensitive*");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="container">
        <div className="">
          <div className="login">
            <h2>Login</h2>
            <div classname="email">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div classname="password">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="">
              <button type="submit">Sign In</button>
              <p className="forgot-password">
                <a href="#">Forgot Password</a>
              </p>
              <div className="">
                <input type="checkbox" id="custom-check" />
                <label htmlFor="custom-check">Remember Me</label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
