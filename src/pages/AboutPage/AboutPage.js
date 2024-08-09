import React from "react";
import { useEffect, useState } from "react"; // imported useEffect and useState from react library
import { fetchApi } from "../../utils/fetchApi";
import aboutpagelogo from '../../assets/images/about-us.png';
import './AboutPage.css';
import { Helmet } from "react-helmet";

const AboutPage = () => {
  const [aboutUsContent, setAboutUsContent] = useState([]);  
  //useState for setting the about us content
  const [isError, setIsError] = useState(false);  
  //useState for setting error if error is caught 
  //useEffect for fetching the data from our local database , we targeted about-us data from our db
  //The data is stored in setAboutUsContent and the data can be used by using the aboutUsContent 
  //Catch block is included if any any unexpected error occur 
  useEffect(() => {
    fetchApi('http://localhost:5001/aboutUs')
      .then((res) => {
        setAboutUsContent(res);
      })
      .catch((err) => {
        setIsError(true);
      })
  }, []);

  //If error occur then we will display an alert with the below message
  if (isError) {
    return (<div className="alert alert-danger mt-5">Some Error Occured! Please Try again later.</div>)
  }

  return (
    <div className="about-page mt-5 text-center">
      {/* to display the page title in the browser helmet used. */}
      <Helmet>
        <title>
          ABOUT PAGE
        </title>
      </Helmet>
      {/* title data is provided by the json server. */}
      <h1>{aboutUsContent.title}</h1>
      {/* aboutus image is imported from the assets */}
      <div className="accordion mt-3" id="accordionExample">
        <div className="accordion-item">
        <img src={aboutpagelogo} alt='about-us-image' width='900'></img>
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Tagline
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>The Tagline of the Company.</strong>
              <p>{aboutUsContent.titleContent}</p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              History
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>History of the Company.</strong>
              {/* titlehistory is provided by the json server */}
              <p>{aboutUsContent.titlehistory}</p>
              <p>{aboutUsContent.titlehistorycontinued}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
