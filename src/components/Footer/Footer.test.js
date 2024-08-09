import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "./Footer";
import { HashRouter, MemoryRouter, NavLink } from "react-router-dom";

describe("Footer", () => {
  test("Is copyright year and developer name present", () => {
    // act
    // writing the logic to test whether the app comp has success text or not
    render(
      <HashRouter>
        <Footer />
      </HashRouter>
    );
    //Render into a container which is appended to document.body.
    const successTextEl = screen.getByText("Copyright 2023 | Sourav ©");
    expect(successTextEl).toBeInTheDocument();
  });

  test("clicking NavLink navigates to correct URL home", () => {
    render(
      <MemoryRouter>
        <NavLink to="/">Home</NavLink>
      </MemoryRouter>
    );
    const linkElement = screen.getByText(/home/i);
    fireEvent.click(linkElement);
    expect(window.location.pathname).toBe("/");
  });
});
