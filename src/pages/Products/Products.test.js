import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { fetchApi } from "../../utils/fetchApi";
import renderer from "react-test-renderer";
import Products from "./Products";

jest.mock("../../utils/fetchApi");

const mockProductsData = [
  {
    title: "Levi's Men's Slim Fit Shirt",
    category: "Men's Wear",
    originalPrice: "1999",
    discount: "10",
    reducedPrice: "1799",
  },
  {
    title: "Van Heusen Women Shirt",
    category: "Women's Wear",
    originalPrice: "1999",
    discount: "10%",
    reducedPrice: "1799",
  },
  {
    title: "Allen Solly Junior Boys Shirt",
    category: "Kid's Wear",
    originalPrice: "999",
    discount: "10%",
    reducedPrice: "899",
  },
];

describe("Products", () => {
  //Positive specs testing
  it("[MOCKING]: fetches product data properly via API Call", async () => {
    fetchApi.mockResolvedValue(mockProductsData);
    render(
      <HashRouter>
        <Products />
      </HashRouter>
    );
    expect(
      await screen.findByText(/Levi's Men's Slim Fit Shirt/i)
    ).toBeInTheDocument();
  });

  //Negative Specs Testing
  it("[MOCKING]: renders error properly during API Call ", async () => {
    // preparing mock error obj
    const error = "Error occured";

    fetchApi.mockRejectedValue(error);
    render(
      <HashRouter>
        <Products />
      </HashRouter>
    );
    expect(
      await screen.findByText(/Some Error Occured! Please Try again later./i)
    ).toBeInTheDocument();
  });

  it("fetches products properly via API call on click of All button", async () => {
    fetchApi.mockResolvedValue(mockProductsData);
    render(
      <HashRouter>
        <Products />
      </HashRouter>
    );
    fireEvent.click(screen.getByTestId(/all/i));
    await waitFor(() => {
      expect(
        screen.getByText(/Levi's Men's Slim Fit Shirt/i)
      ).toBeInTheDocument();
    });
  });

  it("fetches products properly via API call on click of men button", async () => {
    fetchApi.mockResolvedValue(mockProductsData);
    render(
      <HashRouter>
        <Products />
      </HashRouter>
    );
    fireEvent.click(screen.getByTestId(/btnMen/i));
    expect(
      await screen.findByText(/Levi's Men's Slim Fit Shirt/i)
    ).toBeInTheDocument();
  });

  it("fetches products properly via API call on click of women button", async () => {
    fetchApi.mockResolvedValue(mockProductsData);
    render(
      <HashRouter>
        <Products />
      </HashRouter>
    );
    fireEvent.click(screen.getByTestId(/women/i));
    expect(
      await screen.findByText(/Van Heusen Women Shirt/i)
    ).toBeInTheDocument();
  });

  it("fetches products properly via API call on click of kid button", async () => {
    fetchApi.mockResolvedValue(mockProductsData);
    render(
      <HashRouter>
        <Products />
      </HashRouter>
    );
    fireEvent.click(screen.getByTestId(/kid/i));
    expect(
      await screen.findByText(/Allen Solly Junior Boys Shirt/i)
    ).toBeInTheDocument();
  });

  test("renders correctly", () => {
    const tree = renderer
      .create(
        <HashRouter>
          <Products />
        </HashRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
