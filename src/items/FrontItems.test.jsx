import { render } from "@testing-library/react";
import FrontItems from "./FrontItems.jsx";
import { TEST_ITEMS } from "../_testCommons.js";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <FrontItems items={TEST_ITEMS} />
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <FrontItems items={TEST_ITEMS} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have item-list-div", function () {
  const { container } = render(
    <MemoryRouter>
      <FrontItems items={TEST_ITEMS} />
    </MemoryRouter>
  );
  const item_list_div = container.querySelector(".item-list-div");
  expect(item_list_div).toBeInTheDocument();
});
