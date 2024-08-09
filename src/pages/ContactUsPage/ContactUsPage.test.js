import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { fetchApi } from "../../utils/fetchApi";
import { HashRouter } from "react-router-dom";
import ContactUsPage from "./ContactUsPage";

jest.mock("../../utils/fetchApi");

const mockContactData = [
  {
    name: "sourav",
    email: "sourav@gmail.com",
    phone: "54545",
    message: "jhsjhs",
    id: 1,
  },
];

describe("Contact", () => {
  it("[MOCKING]: fetches contact address properly via API Call", async () => {
    // prepare the mock data for users
    const mockContactList = [
      {
        address: "280 ParK Avenue Z,Cross cut Complex, Bangalore, India",
      },
    ];

    fetchApi.mockResolvedValue(mockContactList);
    render(<ContactUsPage />);
    expect(
      await screen.findByText(
        /280 ParK Avenue Z,Cross cut Complex, Bangalore, India/i
      )
    ).toBeInTheDocument();
  });

  it("[MOCKING]: fetches contact email properly via API Call", async () => {
    // prepare the mock data for users
    const mockContactList = [
      {
        email: "contact@sparkclothing.com",
      },
    ];

    fetchApi.mockResolvedValue(mockContactList);
    render(<ContactUsPage />);
    expect(
      await screen.findByText(/contact@sparkclothing.com/i)
    ).toBeInTheDocument();
  });

  // if API fails to connect then negative test case
  it("renders error during API Call", async () => {
    const errorMessage = "fake error message";
    jest.spyOn(window, "fetch").mockRejectedValue(new Error(errorMessage));
    render(<ContactUsPage />);

    await waitFor(() => {
      expect(
        screen.getByText("Some Error Occured! Please Try again later.")
      ).toBeInTheDocument();
    });

    window.fetch.mockRestore();
  });

  //enter your name placeholder input
  it(`has an input with 'Enter Your Name' as placeholder text`, () => {
    render(<ContactUsPage />);
    expect(screen.getByPlaceholderText("Enter name")).toBeTruthy();
  });

  //enter your mail placeholder input
  it(`has an input with 'Enter Your mail' as placeholder text`, () => {
    render(<ContactUsPage />);
    expect(screen.getByPlaceholderText("Enter mail")).toBeTruthy();
  });

  //enter your phone placeholder input
  it(`has an input with 'Enter Your phone' as placeholder text`, () => {
    render(<ContactUsPage />);
    expect(screen.getByPlaceholderText("Enter phone number")).toBeTruthy();
  });

  //enter your message placeholder input
  it(`has an input with 'Enter Your message' as placeholder text`, () => {
    render(<ContactUsPage />);
    expect(screen.getByPlaceholderText("Enter message")).toBeTruthy();
  });

  it(`has an input with 'Name:'text`, () => {
    render(<ContactUsPage />);
    expect(screen.getByText(/Name:/i)).toBeInTheDocument();
  });

  it(`has an input with 'E-mail:' text`, () => {
    render(<ContactUsPage />);
    expect(screen.getByText(/E-mail:/i)).toBeInTheDocument();
  });

  it(`has an input with 'Phone' text`, () => {
    render(<ContactUsPage />);
    expect(screen.getByText(/Phone/i)).toBeInTheDocument();
  });

  it(`has an input with 'Message:' text`, () => {
    render(<ContactUsPage />);
    expect(screen.getByText(/Message:/i)).toBeInTheDocument();
  });

  //get in touch heading
  it("has 'Get In Touch' text", () => {
    render(<ContactUsPage />);
    const h1Element = screen.getByText(/Get In Touch/i);
    expect(h1Element).toBeInTheDocument();
  });

  //submit button color
  it("has button with css class btn btn-primary", () => {
    render(<ContactUsPage />);
    const contacts = screen.getByTestId("submitBtn");
    expect(contacts).toHaveClass("btn btn-primary");
  });

  //Alt text in getin touch logo
  test(`image must have alt = "Getintouchlogo"`, () => {
    render(<ContactUsPage />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "GetInTouchLogo");
  });

  it("inputs gets emptied on submit", async () => {
    fetchApi.mockResolvedValue(mockContactData);
    render(
      <HashRouter>
        <ContactUsPage />
      </HashRouter>
    );
    fireEvent.click(screen.getByTestId(/submitBtn/i));
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Enter name/i)).toBeEmptyDOMElement();
    });
  });
});
