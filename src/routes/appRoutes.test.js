import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { HashRouter, MemoryRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import AboutPage from "../pages/AboutPage/AboutPage";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/Products/ProductDetails/ProductDetails";
import ContactUsPage from "../pages/ContactUsPage/ContactUsPage";
import AppRoutes from "../routes/appRoutes";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import renderer from "react-test-renderer";

jest.mock("../pages/HomePage/HomePage");
jest.mock("../pages/AboutPage/AboutPage");
jest.mock("../pages/ContactUsPage/ContactUsPage");
jest.mock("../pages/Products/Products");
jest.mock("../pages/Products/ProductDetails/ProductDetails");
jest.mock("../pages/PageNotFound/PageNotFound");

describe("Tests for App Router", () => {
  it("Should render page HomePage on default route", () => {
    HomePage.mockImplementation(() => <div>HomePageMock</div>);
    render(
      <HashRouter initialEntries={["/"]}>
        <AppRoutes />
      </HashRouter>
    );
    expect(screen.getByText("HomePageMock")).toBeInTheDocument();
  });

  it("Should render page AboutPage on routing", async () => {
    AboutPage.mockImplementation(() => <div>AboutPageMock</div>);
    render(
      <MemoryRouter initialEntries={["/aboutus/content"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/AboutPageMock/i)).toBeInTheDocument();
    });
  });

  it("Should render page Contact on routing", () => {
    ContactUsPage.mockImplementation(() => <div>ContactUsMock</div>);
    render(
      <MemoryRouter initialEntries={["/contactus/content"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText(/ContactUsMock/i)).toBeInTheDocument();
  });

  it("Should render page Products on  routing", () => {
    Products.mockImplementation(() => <div>ProductsMock</div>);
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/ProductsMock/i)).toBeInTheDocument();
  });

  it("Should render page ProductDetails on routing", () => {
    ProductDetails.mockImplementation(() => <div>ProductDetailsMock</div>);

    render(
      <MemoryRouter initialEntries={["/products/product-details/:productId"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/ProductDetailsMock/i)).toBeInTheDocument();
  });

  it("Should render Page not found page on routing", () => {
    PageNotFound.mockImplementation(() => <div>PageNotFoundMock</div>);

    render(
      <MemoryRouter initialEntries={["/*"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/PageNotFoundMock/i)).toBeInTheDocument();
  });

  test("renders correctly", () => {
    const tree = renderer
      .create(
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
