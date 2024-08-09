import { render, screen, waitFor } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { fetchApi } from "../../utils/fetchApi";
import AboutPage from "./AboutPage";

jest.mock("../../utils/fetchApi");

const mockContactList = [
  {
    title: "About Spark Clothing",
    history: "The History",
  },
];

describe("AboutUs", () => {
  it("[MOCKING]: fetches about title properly via API Call", async () => {
    // prepare the mock data for users
    fetchApi.mockResolvedValue(mockContactList);
    render(
      <HashRouter>
        <AboutPage />
      </HashRouter>
    );
    //expect(await screen.findByText(/About Spark Clothing/i)).toBeInTheDocument();
    await waitFor(() => {
      screen.findByText(/About Spark Clothing/i);
      screen.findByText(/the tagline of the company/i);
    });
  });

  it("[MOCKING]: fetches about history properly via API Call", async () => {
    fetchApi.mockResolvedValue(mockContactList);
    render(<AboutPage />);
    //expect(await screen.findByText(/The History/i)).toBeInTheDocument();
    await waitFor(() => {
      screen.findByText(/The History/i);
    });
  });

  // if API fails to connect then negative test case
  it("renders error during API Call", async () => {
    fetchApi.mockRejectedValue({
      errorMessage: "Some Error Occured! Please Try again later.",
    });

    render(<AboutPage />);
    // await waitFor(()=>{
    //   screen.queryByText('Some Error Occured! Please Try again later.')
    // })
    expect(
      await screen.findByText("Some Error Occured! Please Try again later.")
    ).toBeInTheDocument();
  });
});
