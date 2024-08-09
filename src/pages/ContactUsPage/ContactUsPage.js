import React, { useEffect, useState } from "react"; // imported useEffect and useState from react library
import { useFormik } from "formik"; // imported useFormik from formik package for the form
import { Helmet } from "react-helmet";
import getintouch from "../../assets/images/getintouch.png";
import contactus from "../../assets/images/contact.png";
import "./ContactUsPage.css";

const ContactUsPage = () => {
  const [contactUsDetail, setContactUsDetail] = useState([]);
  //useState for setting the contact us content
  const [isError, setIsError] = useState(false);
  //useState for setting error if error is caught

  //useEffect for fetching the data from our local database , we targeted contact -us data from our db
  //The data is stored in setContactUsDetail and the data can be used by using the contactUsDetail
  //Catch block is included if any any unexpected error occur
  useEffect(() => {
    fetch("http://localhost:5001/contactData")
      .then((res) => {
        return res.json();
      })
      .then((resInJSON) => {
        setContactUsDetail(resInJSON);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, []);

  //useFormik for submitting the form data to the local backend
  //And also validating the fields in the form
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },

    onSubmit: (values, { resetForm }) => {
      // console.log('form submit', values)
      alert("Do You Want To Submit Your Details?");
      fetch("http://localhost:5001/getInTouchData", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      resetForm({ values: "" });
    },
  });

  //If error occur then we will display an alert with the below message
  if (isError) {
    return (
      <div className="alert alert-danger mt-5">
        Some Error Occured! Please Try again later.
      </div>
    );
  }

  //Get In Touch form takes the users name,e-mail,phone number and the message the user wants to convey
  //In the end the contact detail for Spark Clothing is displayed
  //by fetching the data from our local db (Address,Phone no. and E-mail)
  return (
    <div className="contact-wrapper mt-5">
      {/* page title in the browser */}
      <Helmet>
        <title>CONTACT PAGE</title>
      </Helmet>
      {/* Get in touch with us part */}
      <div className="form-container">
        <h1 className="text-center">Get In Touch</h1>
        <div className="text-center">
          <img src={getintouch} alt="GetInTouchLogo"></img>
        </div>
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          {/* Name part of the form */}
          <label>
            <strong>Name:</strong>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter name"
            required
            className="form-control"
            value={formik.values.name}
            onChange={formik.handleChange}
          />{" "}
          <br />
          {/* Email part of the form */}
          <label>
            <strong>E-mail:</strong>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter mail"
            required
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
          />{" "}
          <br />
          {/* Phone number part of the form */}
          <label>
            <strong>Phone:</strong>
          </label>
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Enter phone number"
            required
            className="form-control"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />{" "}
          <br />
          {/* Message or any feedback or suggestion part of the form */}
          <label>
            <strong>Message:</strong>
          </label>
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Enter message"
            required
            className="form-control"
            value={formik.values.message}
            onChange={formik.handleChange}
          />{" "}
          <br />
          <div className="submit-btn text-center">
            <button
              data-testid="submitBtn"
              className="btn btn-primary"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <hr />
      {contactUsDetail.map((contact) => {
        // Contact Us part
        return (
          <div className="contact-us" key={contact.phone[0]}>
            <h1 className="text-center">Contact Us</h1>
            <div className="text-center">
              <img
                src={contactus}
                alt="ContactUsLogo"
                width="300"
                height="300"
              ></img>
            </div>
            {/* All the address phone and email data we are getting from the json server. */}
            <div className="flex-container text-center mt-3">
              <div>
                <h3>Address - {contact.address}</h3>
              </div>
              <div>
                <h3>
                  Phone - {contact.phone[0]},{contact.phone[1]}
                </h3>
              </div>
              <div>
                <h3>Email - {contact.email}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactUsPage;
