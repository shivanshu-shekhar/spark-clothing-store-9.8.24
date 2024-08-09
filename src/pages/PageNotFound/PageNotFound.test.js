import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import PageNotFound from "./PageNotFound";

//Go to home button testing
it("Is go to home button working", () => {
  render(
    <HashRouter>
      <PageNotFound />
    </HashRouter>
  );
  const goHome = screen.getByTestId("goHome");
  expect(goHome).toHaveTextContent("Home");
});

test("renders correctly", () => {
  const tree = renderer
    .create(
      <HashRouter>
        <PageNotFound />
      </HashRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
