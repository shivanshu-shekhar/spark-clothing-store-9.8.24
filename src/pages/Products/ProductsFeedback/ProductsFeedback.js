import Button from "react-bootstrap/Button"; //imported Button from react-bootstrap
import Modal from "react-bootstrap/Modal"; //imported Modal from react-bootstrap
import { useEffect, useRef, useState } from "react"; //imported useEffect and useState from react
import { fetchApi } from "../../../utils/fetchApi";
import feedbackImg from "../../../assets/images/feedback.png";
import PropTypes from "prop-types";

const ProductsFeedback = (props) => {
  const formRef = useRef("");
  const [feedbackArray, setFeedbackArray] = useState([]);
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState("");

  //Fetching feedback data given by the user . And after fetching the data we validate the product id
  useEffect(() => {
    fetchApi("http://localhost:5001/feedback")
      .then((val) => {
        // console.log(val);
        setFeedbackArray([...val]);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let x = [];
    //Condition for the already used email
    feedbackArray.forEach((feedback) => {
      if (feedback.email === email && feedback.productId === props.productId) {
        x.push(feedback);
      }
    });
    console.log(x.length);

    //Alert bar for the used email popup and permission
    if (x.length > 0) {
      alert("This E-mail is Already in Use or Feedback already Submitted");
    } else {
      alert("Do You Want to Submit this feedback");
      const data = { name, email, phone, comment, rate };

      //fetching the feedback
      fetch("http://localhost:5001/feedback", {
        method: "POST",
        body: JSON.stringify({ ...data, productId: props.productId }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      formRef.current.reset();
      document.getElementById("closeButton").click();
      //window.location.reload();
    }
  };

  //Error message
  if (isError) {
    return (
      <div className="alert alert-danger mt-5">
        Some Error Occured! Please Try again later.
      </div>
    );
  }

  return (
    //Feedback form starts here
    <Modal
      key={props.productId}
      show={props.show}
      onHide={props.onHide}
      size="lg"
      role="dialog"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <img
            src={feedbackImg}
            alt="feedback image"
            data-testid="feedbackImage"
            style={{
              height: "200px",
              width: "716px",
            }}
          />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form
          autoComplete="off"
          data-testid="feedback-form"
          onSubmit={handleSubmit}
          ref={formRef}
          className="form-container"
        >
          <label htmlFor="name">
            <strong>Name:</strong>
          </label>
          <input
            data-testid="name"
            type="text"
            name="name"
            placeholder="Enter Your Name"
            id="name"
            className="form-control"
            onChange={(event) => setName(event.target.value)}
            required
          />{" "}
          <label htmlFor="email">
            <strong>E-mail:</strong>
          </label>
          <input
            type="email"
            data-testid="email"
            name="email"
            placeholder="Enter Your Email"
            id="email"
            className="form-control"
            onChange={(event) => setEmail(event.target.value)}
            required
          />{" "}
          <label htmlFor="phone">
            <strong>Phone:</strong>
          </label>
          <input
            type="number"
            data-testid="phone"
            name="phone"
            placeholder="Enter Your Phone Number"
            id="phone"
            className="form-control"
            onChange={(event) => setPhone(event.target.value)}
            required
          />{" "}
          <label htmlFor="comment">
            <strong>Feedback:</strong>
          </label>
          <input
            data-testid="comment"
            type="text-area"
            name="comment"
            placeholder="Enter Your Feedback"
            id="comment"
            className="form-control"
            onChange={(event) => setComment(event.target.value)}
            required
          />{" "}
          <div className="text-center">
            <h4>Please provide the rating of the Product</h4>
            <h5>Where 😆: Is 5 Star And 🤢: Is 1 Star </h5>
            <input
              type="radio"
              id="star5"
              name="rate"
              defaultValue={5}
              onChange={(event) => setRate(event.target.value)}
              required
            />
            <label htmlFor="star5" title="text">
              😆
            </label>
            <input
              type="radio"
              id="star4"
              name="rate"
              defaultValue={4}
              onChange={(event) => setRate(event.target.value)}
              required
            />
            <label htmlFor="star4" title="text">
              😄
            </label>
            <input
              type="radio"
              id="star3"
              name="rate"
              defaultValue={3}
              onChange={(event) => setRate(event.target.value)}
              required
            />
            <label htmlFor="star3" title="text">
              😐
            </label>
            <input
              type="radio"
              id="star2"
              name="rate"
              defaultValue={2}
              onChange={(event) => setRate(event.target.value)}
              required
            />
            <label htmlFor="star2" title="text">
              😠
            </label>
            <input
              type="radio"
              id="star1"
              name="rate"
              defaultValue={1}
              onChange={(event) => setRate(event.target.value)}
              required
            />
            <label htmlFor="star1" title="text">
              🤢
            </label>
          </div>
          <div className="text-center">
            <button
              data-testid="submitBtn"
              className="btn btn-primary"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          className="btn btn-danger"
          id="closeButton"
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    //Feedback form ends here
  );
};

// Validating prop types
ProductsFeedback.propTypes = {
  productId: PropTypes.number,
  show: PropTypes.number,
  onHide: PropTypes.func,
};

export default ProductsFeedback;
