import React, { useEffect, useState } from "react"; //imported useEffect and useState from react library
import { NavLink } from "react-router-dom"; //imported Link from react-router-dom
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../../utils/fetchApi";
import { Helmet } from "react-helmet";//For the document title

const Products = () => {
  //useState for setting up the data for the products
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  //useEffect for fetching the data for the products and storing it in setData
  useEffect(() => {
    fetchApi("http://localhost:5001/data")
      .then((res) => {
        setData(res);
        // setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        // setIsLoading(false);
      });
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className="spinner-border text-success mt-5" role="status"></div>
  //   );
  // }

  //Error message
  if (isError) {
    return (
      <div className="alert alert-danger mt-5">
        Some Error Occured! Please Try again later.
      </div>
    );
  }

  //It handles all the products of all the categories
  const handleCategoryAll = () => {
    navigate("/products");
    fetchApi("http://localhost:5001/data").then((res) => {
      setData(res);
    });
  };

  //It handles only the category that is passed in the query parameter and according to that displays the products
  const handleCategory = (category) => {
    if (category !== "All") {
      if (category === "Men's Wear") {
        navigate("/products?category=men's wear");
      } else if (category === "Women's Wear") {
        navigate("/products?category=women's wear");
      } else if (category === "Kid's Wear") {
        navigate("/products?category=kid's wear");
      }
      fetchApi(`http://localhost:5001/data?category=${category}`).then(
        (res) => {
          setData(res);
        }
      );
    }
  };

  //Added four buttons for category . All button will display all the items in the product data irrespective of the category .
  //The other three buttons would filter the product data and the display the elements with the same category as the button name .
  //We are using bootstrap cards to display the product data to the users
  //In the card we include a link which links to the respective product details and also displays the feedback if provided by the user .
  return (
    <div className="product-wrapper center-align mt-5">
      <Helmet>
        <title>PRODUCTS PAGE</title>
      </Helmet>
      <div className="text-center">
        <button
          data-testid="all"
          className="btn btn-primary mx-2 my-3"
          onClick={() => handleCategoryAll("All")}
        >
          All
        </button>
        <button
          data-testid="btnMen"
          className="btn btn-primary mx-2 my-3"
          onClick={() => handleCategory("Men's Wear")}
        >
          Men's Wear
        </button>
        <button
          data-testid="women"
          className="btn btn-primary mx-2 my-3"
          onClick={() => handleCategory("Women's Wear")}
        >
          Women's Wear
        </button>
        <button
          data-testid="kid"
          className="btn btn-primary mx-2 my-3"
          onClick={() => handleCategory("Kid's Wear")}
        >
          Kid's Wear
        </button>
      </div>

      <div className="row">
        {data.map(
          ({
            id,
            title,
            img,
            category,
            reducedPrice,
            originalPrice,
            discount,
          }) => {
            return (
              <div className="col-md-4 text-center" key={id}>
                <div className="card">
                  <img
                    className="card-img-top"
                    src={img}
                    alt={title}
                    height="600px"
                  />
                  {/* Products details for the particular product. */}
                  <div className="card-body">
                    <NavLink to={`product-details/${id}`}>
                      <button type="button" class="btn btn-outline-dark">
                        <h4 className="card-title">
                          {title} ({category})
                        </h4>
                      </button>
                    </NavLink>
                    {/* Products details */}
                    <h5 className="card-title">
                      Our Price :Rs {reducedPrice}
                      <br />
                      Discount :{discount}
                      <br />
                      Market Price :Rs <s>{originalPrice}</s>
                    </h5>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Products;
