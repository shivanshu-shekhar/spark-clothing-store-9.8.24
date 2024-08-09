import { render, screen } from "@testing-library/react";
import App from "./App";

test("has app-main", () => {
  render(<App />);
  expect(screen.getByTestId("app-main")).toHaveClass("container mt-5 pt-3");
});
