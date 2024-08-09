import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApi } from "../../../utils/fetchApi";
import ProductsFeedback from "../ProductsFeedback/ProductsFeedback";

const ProductDetails = () => {
  let { productId } = useParams();
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    //fetching the data from the backend server for particular product.
    fetchApi(`http://localhost:5001/data?id=${productId}`)
      .then((result) => {
        //console.log(result[0]);
        setData(result[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });

    //fetching the user feedback from the backend server and displaying it on the page.
    fetchApi(`http://localhost:5001/feedback?productId=${productId}`)
      .then((resInJSON) => {
        // capturing the converted JSON res
        // console.log(resInJSON);
        if ((resInJSON.status !== 404)) {//changed
          setIsLoading(false);
          setIsError(false);
          setUserList(resInJSON);
        } else {
          setIsLoading(false);
          setIsError(true);
          setUserList([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
        setUserList([]);
      });
  }, [productId,userList]);

  //Spinner for the loading
  if (isLoading) {
    return (
      <div className="spinner-border text-success mt-5" role="status"></div>
    );
  }

  //Error message
  if (isError) {
    return (
      <div className="alert alert-danger mt-5">
        Some Error Occured! Please Try again later.
      </div>
    );
  }

  return (
    //Products details part start here.
    <div className="mt-5">
      <h1>Product Details: {data.title}</h1>
      <div className="card">
        <img
          className="card-img-top"
          src={data.img}
          alt="Card image cap"
          width="100"
          height="1000"
        />
        <a className="text-center mt-3" href={data.url}>
          <button type="button" class="btn btn-dark">
            Visit the Official Store: {data.store}
          </button>
        </a>
        <div className="card-body text-center">
          <h4 className="card-title">{data.category}</h4>
          <h5 className="card-text">{data.title}</h5>
          <p className="card-text">
            <strong>Rs</strong> {data.reducedPrice} only
          </p>
          <p className="card-text">{data.description}</p>
          <p className="card-text">{data.fit}</p>
          <h5 className="card-text">Ratings :{data.rating}</h5>
        </div>
        {/* Products details part ends here. */}
        {/* Feeback button to submit the feedback. */}
        <button
          className="btn btn-primary"
          onClick={() => setModalShow(data.id)}
        >
          Click Here To Submit The Feedback
        </button>

        <div className="row mt-4">
          <h5>
            <strong>FEEDBACK BY THE USERS:</strong>
          </h5>
          {/* The feedbacks from the user */}
          {userList?.map((user) => {
            return (
              <div className="col-md-12" key={user.id}>
                <div className="card">
                  <div className="card-body">
                    <p className="card-title">
                      {/* user name */}
                      <strong>User Name: {user.name}</strong>
                    </p>
                    <p className="card-text">
                      {/* Feedback by the user */}
                      Feedback Given By The User:{" "}
                      <strong>{user.comment}</strong>
                    </p>
                    <p className="card-text">
                      {/* The rating by the user */}
                      Rating Given By The User:{" "}
                      <strong>{user.rate} stars</strong>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {modalShow && (
        <ProductsFeedback
          show={modalShow}
          onHide={() => setModalShow(null)}
          productId={modalShow}
        />
      )}
    </div>
  );
};

export default ProductDetails;
