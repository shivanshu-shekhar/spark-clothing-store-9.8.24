import React from "react";
import { NavLink } from "react-router-dom";
//homepage logo is imported here.
import shoplogo from "../../assets/images/LOGO.jpg";
//navbar file is imported here to show other icons.
import NavBar from "../NavBar/NavBar";

function Header() {
  // Must RETURN JSX
  return (
    // this is the header section we copy from the bootstrap.
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          {/* Homepage logo on the navbar */}
          <NavLink className="navbar-brand" to="/">
            <img
              className="img-fluid img-thumbnail rounded"
              src={shoplogo}
              alt="shopLogo"
              width="150"
              height="100"
            ></img>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Other icons on the navbar */}
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <NavBar />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
