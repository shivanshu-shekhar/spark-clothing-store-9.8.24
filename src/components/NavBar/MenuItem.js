import React from 'react';
//navlink is imported for the routing without page refresh
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuItem = (props) => {
  return (
    <li className="nav-item">
      {/* props are received here from the navbar.js file. */}
      <NavLink to={props.url} className="nav-link" aria-current="page">
        {/* all the logo except the homepage logo are here */}
        <img className='rounded' src={props.logo} alt='logo' width="60" height="50"></img>
        <br />
        {props.name}
      </NavLink>
    </li>
  );
};

MenuItem.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
};

export default MenuItem;