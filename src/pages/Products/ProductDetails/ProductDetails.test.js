import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { fetchApi } from "../../../utils/fetchApi";
import renderer from "react-test-renderer";
import ProductDetails from "./ProductDetails";

jest.mock("../../../utils/fetchApi");

const feedbackReviews = [
  {
    comment: "Good",
    name: "sourav",
  },
];

const mockItems = [
  {
    title: "Nike Top",
    category: "women",
    originalPrice: "2999",
  },
];

describe("ProductDetails", () => {
  //Postive test specs
  it("[MOCKING]: fetches productId properly via API Call", async () => {
    fetchApi.mockResolvedValue(mockItems);
    render(
      <HashRouter>
        <ProductDetails />
      </HashRouter>
    );
    expect(await screen.findByText(/women/i)).toBeInTheDocument();
  });

  it("[MOCKING]: fetches product data properly via API Call", async () => {
    fetchApi.mockResolvedValue(feedbackReviews);
    render(
      <HashRouter>
        <ProductDetails />
      </HashRouter>
    );
    expect(await screen.findByText(/sourav/i)).toBeInTheDocument();
  });

  //Negative test specs
  it("[MOCKING]: renders error properly during API Call ", async () => {
    // preparing mock error obj
    const error = "Error occured";

    fetchApi.mockRejectedValue(error);
    render(
      <HashRouter>
        <ProductDetails />
      </HashRouter>
    );
    expect(
      await screen.findByText(/Some Error Occured! Please Try again later./i)
    ).toBeInTheDocument();
  });

  test("renders correctly", () => {
    const tree = renderer
      .create(
        <HashRouter>
          <ProductDetails />
        </HashRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
