import React from "react";
//navlink for the routing imported
import { NavLink } from "react-router-dom";
//proptypes are imported
import PropTypes from "prop-types";
//SCSS footer file is linked here
import "./Footer.scss";

const Footer = (props) => {
  const copyrightYear = 2023;
  // copyright symbol code here used in the footer
  const copyright = String.fromCodePoint(0x00a9);
  return (
    <footer className="text-center">
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
        {/* Linking of the homepage here */}
          <NavLink className="nav-link" aria-current="page" to="/">
            Home
          </NavLink>
        </li>
        {/* Linking of the products page here */}
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/products">
            Products
          </NavLink>
        </li>
        {/* Linking of the About page here */}
        <li className="nav-item">
          <NavLink
            className="nav-link"
            aria-current="page"
            to="/aboutus/content/"
          >
            About Us
          </NavLink>
        </li>
        {/* linking of the contact page here */}
        <li className="nav-item">
          <NavLink
            className="nav-link"
            aria-current="page"
            to="/contactus/content/"
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
      {/* red-text class is used in the footer.scss file to make the text appear red. */}
      <p className="red-text">
        Copyright {copyrightYear} | {props.developerName} {copyright}{" "}
      </p>
    </footer>
  );
};

//specifies the default values for props:
Footer.defaultProps = {
  developerName: "Shivanshu",
};
// props validation here
Footer.propTypes = {
  developerName: PropTypes.string,
};

export default Footer;
