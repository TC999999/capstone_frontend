import { render } from "@testing-library/react";
import ItemCard from "./ItemCard.jsx";
import { TEST_ITEM } from "../_testCommons.js";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <ItemCard item={TEST_ITEM} />
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <ItemCard item={TEST_ITEM} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have item-card", function () {
  const { container } = render(
    <MemoryRouter>
      <ItemCard item={TEST_ITEM} />
    </MemoryRouter>
  );
  const item_card = container.querySelector(".item-card");
  expect(item_card).toBeInTheDocument();
});
