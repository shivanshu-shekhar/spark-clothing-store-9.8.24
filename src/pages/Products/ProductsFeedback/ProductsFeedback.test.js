import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import ProductsFeedback from "./ProductsFeedback";

describe("Feedback", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  //Positive TEST specs
  it("renders feedback form", () => {
    const onClose = jest.fn();
    render(<ProductsFeedback show={true} onHide={onClose} />);
    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("E-mail:")).toBeInTheDocument();
    expect(screen.getByText("Phone:")).toBeInTheDocument();
    expect(screen.getByText("Feedback:")).toBeInTheDocument();
    expect(screen.getByText("😆")).toBeInTheDocument();
    expect(screen.getByText("😄")).toBeInTheDocument();
    expect(screen.getByText("😐")).toBeInTheDocument();
    expect(screen.getByText("😠")).toBeInTheDocument();
    expect(screen.getByText("🤢")).toBeInTheDocument();
    expect(screen.getByTestId("feedbackImage")).toBeInTheDocument();
    expect(screen.getByTestId("submitBtn")).toBeInTheDocument();
  });

  //Negative TEST specs
  it("[MOCKING]: renders error properly during API Call ", async () => {
    const errorMessage = "fake error message";
    jest.spyOn(window, "fetch").mockRejectedValue(new Error(errorMessage));
    render(<ProductsFeedback />);
    await waitFor(() => {
      expect(
        screen.getByText("Some Error Occured! Please Try again later.")
      ).toBeInTheDocument();
    });

    window.fetch.mockRestore();
  });

  //Alert pop up testing
  it("[SPYING]: check feedback data properly via API Call and alert comes for submission", async () => {
    const spy = jest.spyOn(window, "alert").mockImplementation(() => {});
    const onClose = jest.fn();
    render(<ProductsFeedback show={true} onHide={onClose} productId="123" />);
    const nameInput = screen.getByLabelText("Name:");
    const emailInput = screen.getByLabelText("E-mail:");
    const phoneInput = screen.getByLabelText("Phone:");
    const messageInput = screen.getByLabelText("Feedback:");
    const ratingInput = screen.getByLabelText("😆");
    const submitButton = screen.getByTestId("submitBtn");

    await act(async () => {
      // Fill in form fields
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, {
        target: { value: "johndoe@example.com" },
      });
      fireEvent.change(phoneInput, { target: { value: "1234567890" } });
      fireEvent.change(messageInput, {
        target: { value: "This is a test message." },
      });
      fireEvent.click(ratingInput);

      // Mock successful form submission
      jest.spyOn(window, "fetch").mockResolvedValue({
        ok: true,
        json: async () => {
          return { message: "Success" };
        },
      });

      // Submit the form
      fireEvent.click(submitButton);
    });

    expect(spy).toHaveBeenCalledWith("Do You Want to Submit this feedback");
    window.fetch.mockRestore();
    spy.mockRestore();
  });
});
