import React from "react";
import cod from "../../assets/images/cash-delivery.jpeg";
import brands from "../../assets/images/more-brands.jpg";
import easyreturns from "../../assets/images/thirtydays.png";
import Carousel from "react-bootstrap/Carousel";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  //tm trademark code
  const trademark = String.fromCodePoint(0x02122);

  return (
    <div className="mt-5">
      {/* page title in the browser */}
      <Helmet>
        <title>HOME PAGE</title>
      </Helmet>
      <h1 className="text-center">
        <strong>
          <i>Welcome To Spark Clothing</i>
        </strong>
      </h1>
      <div className="p-5 mb-4 bg-info rounded-3 mt-5">
        <div className="container-fluid py-5">
          <h2 className="display-5 fw-bold">
            SPARK CLOTHING SHOP {trademark}{" "}
          </h2>
          <p className="col-md-12 fs-4">
            Spark Clothing, India&apos;s no. 1 online fashion destination
            justifies its fashion relevance by bringing something new and chic
            to the table on the daily. Fashion trends seem to change at
            lightning speed, yet the Spark Clothing shopping app has managed to
            keep up without any hiccups. In addition, Spark Clothing has vowed
            to serve customers to the best of its ability by introducing its
            first-ever loyalty program, The Spark Clothing Insider. Gain access
            to priority delivery, early sales, lucrative deals and other special
            perks on all your shopping with the Spark Clothing app.
          </p>
          {/* Shop the latest fashion lands to all the products. */}
            <NavLink to="/products">
              <button
                className="btn btn-danger btn-lg"
                type="button"
                data-testid="getBtn"
              >
                Shop The Latest Fashion
              </button>
            </NavLink>
        </div>
      </div>
      {/* Carousel part starts here */}
      {/* Carousel is imported from the npm */}
      <div className="carousel-items">
        <Carousel variant="dark" fade data-testid="carousel">
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              src={cod}
              alt="First slide"
              height="600"
              width="90"
            />
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              src={brands}
              alt="Second slide"
              height="600"
              width="90"
            />
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              src={easyreturns}
              alt="Third slide"
              height="600"
              width="90"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      {/* carousel part ends here */}
    </div>
  );
};

export default HomePage;
