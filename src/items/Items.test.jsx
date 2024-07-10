import { render } from "@testing-library/react";
import Items from "./Items.jsx";
import { TEST_ITEMS } from "../_testCommons.js";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <Items items={TEST_ITEMS} />
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <Items items={TEST_ITEMS} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have item-list", function () {
  const { container } = render(
    <MemoryRouter>
      <Items items={TEST_ITEMS} />
    </MemoryRouter>
  );
  const item_list = container.querySelector(".item-list");
  expect(item_list).toBeInTheDocument();
});
