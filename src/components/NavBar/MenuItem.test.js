import { render, screen, fireEvent } from "@testing-library/react";
import { HashRouter, NavLink } from "react-router-dom";
import MenuItem from "./MenuItem";

describe("MenuItems", () => {
  test("clicking NavLink navigates to correct URL home", () => {
    render(
      <HashRouter>
        <NavLink to="/">Home</NavLink>
      </HashRouter>
    );
    const linkElement = screen.getByText(/home/i);
    fireEvent.click(linkElement);
    expect(window.location.pathname).toBe("/");
  });

  //Alt text in logo
  test(`image must have alt = "logo"`, () => {
    render(
      <HashRouter>
        <MenuItem />
      </HashRouter>
    );
    const imageElement = screen.getByAltText(/logo/i);
    expect(imageElement).toBeInTheDocument();
  });
});
