import React from "react";
import { NavLink } from "react-router-dom";

function Navigation(loggedIn) {
  return (
    <div className="navigation">
      <nav className="navbar">
        <div className="container">
          <h1>Ensemble</h1>
          <div>
            <ul className="navbar">
              <li className="home">
                <NavLink className="nav-link" to="/Home">
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/Groups">
                  Groups
                </NavLink>
                {loggedIn ? (
                  <NavLink className="nav-link" to="/User">
                    Profile
                  </NavLink>
                ) : null}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
