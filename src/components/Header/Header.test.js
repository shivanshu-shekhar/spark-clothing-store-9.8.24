import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, HashRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Header from "./Header";

describe("Header", () => {
  test("clicking NavLink navigates to correct URL", () => {
    render(
      <MemoryRouter>
        <NavLink to="/">HomePage</NavLink>
      </MemoryRouter>
    );
    const linkElement = screen.getByText(/Homepage/i);
    fireEvent.click(linkElement);
    expect(window.location.pathname).toBe("/");
  });

  //Alt text in shop logo
  test(`image must have alt = "shopLogo"`, () => {
    render(
      <HashRouter>
        <Header />
      </HashRouter>
    );
    const imageElement = screen.getByAltText(/shoplogo/i);
    expect(imageElement).toBeInTheDocument();
  });
});
