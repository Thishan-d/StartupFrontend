import React, { Component } from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
        <Link className="navbar-brand mx-3" to="/">
          Home
        </Link>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link mx-3" to="/addStartup">
                Add Startup
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
