import React from "react";
import pagenotfoundlogo from "../../assets/images/page-not-found.jpg";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

const PageNotFound = () => {
  return (
    <div className="mt-5">
      {/* page title in the browser */}
      <Helmet>
        <title>ERROR 404 PAGE</title>
      </Helmet>
      {/* heading of the page not found */}
      <h1 className="text-center">
        Page not Found Error 404
        <img className="mt-3" src={pagenotfoundlogo} alt="page not found logo"></img>
        <p>Navigate to Home Page</p>
        {/* navigate to the homepage button */}
        <NavLink to="/">
          <button className="border rounded-pill" data-testid="goHome">
            Home
          </button>
        </NavLink>
      </h1>
    </div>
  );
};

export default PageNotFound;
