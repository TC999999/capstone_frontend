import { render } from "@testing-library/react";
import FrontItemCard from "./FrontItemCard.jsx";
import { TEST_ITEM } from "../_testCommons.js";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <FrontItemCard item={TEST_ITEM} />
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <FrontItemCard item={TEST_ITEM} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
