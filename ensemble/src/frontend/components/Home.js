import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="">
          <div className="">
            <h1>Welcome to Ensemble!</h1>
            <h3>Let's study together</h3>
            <br></br>
            <div>
              <Link to="/Signup ">
                <button>Sign up</button>
              </Link>
            </div>
            <p>Join the fastest growing study group!</p>
          </div>
          <br></br>
          <div>
            <p>
              Alrady a member? <Link to="/Login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
