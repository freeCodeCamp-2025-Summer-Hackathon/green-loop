import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [major, setMajor] = useState("");
  const [collegeYear, setCollegeYear] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [bio, setBio] = useState("");
  const [createAt, setCreateAt] = useState("");
  const [isVerified, setIsVerified] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [isActive, setIsActive] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      user_name: userName,
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      password: passowrd,
      college_name: collegeName,
      college_year: collegeYear,
      major: major,
      profile_url: profilePicUrl,
      biography: bio,
      created: createAt,
    };
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit} className="container">
        <div className="">
          <div className="">
            <h2>Sign up</h2>

            <div>
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
              <div>
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="example@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Username"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label>School Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="College/University Name"
                  onChange={(e) => setCollegeName(e.target.value)}
                />
              </div>
              <div>
                <label>School Year</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Username"
                  onChange={(e) => setCollegeYear(e.target.value)}
                />
              </div>
              <div>
                <label>Major</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Major"
                  onChange={(e) => setMajor(e.target.value)}
                />
              </div>
              <div>
                <label>Profile Picture</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://www.example.com"
                  onChange={(e) => setProfilePicUrl(e.target.value)}
                />
              </div>
              <div>
                <label>Bio</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tell us about you..."
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div>
                <button type="submit">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
