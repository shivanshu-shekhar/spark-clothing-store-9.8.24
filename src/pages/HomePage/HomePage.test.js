import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import HomePage from "./HomePage";

describe("Home", () => {
  it("has 'Welcome To Spark Clothing' text", () => {
    //Act
    render(
      <HashRouter>
        <HomePage />
      </HashRouter>
    );
    // using regex to find the text with case insensitive
    const h1Element = screen.getByText(/Welcome To Spark Clothing/i);
    //Assert
    expect(h1Element).toBeInTheDocument();
  });

  //get the latest fashion button
  it("has button with css class btn btn-danger", () => {
    render(
      <HashRouter>
        <HomePage />
      </HashRouter>
    );
    const appbtn = screen.getByTestId("getBtn");
    expect(appbtn).toHaveClass("btn btn-danger btn-lg");
  });

  //carousel testing
  it("has a carousel", () => {
    render(
      <HashRouter>
        <HomePage />
      </HashRouter>
    );
    const carouselElement = screen.getByTestId("carousel");
    expect(carouselElement).toBeInTheDocument();
  });
  //npm test -- --coverage for the code coverage
});
