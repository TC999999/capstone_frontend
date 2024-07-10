import { render } from "@testing-library/react";
import MessageListCard from "./MessageListCard.jsx";
import { TEST_MESSAGE } from "../_testCommons.js";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <MessageListCard message={TEST_MESSAGE} />
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <MessageListCard message={TEST_MESSAGE} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have a message card class", function () {
  const { container } = render(
    <MemoryRouter>
      <MessageListCard message={TEST_MESSAGE} />
    </MemoryRouter>
  );
  const card = container.querySelector(".message-card");
  expect(card).toBeInTheDocument();
});

it("should have a message card class", function () {
  const { getByText } = render(
    <MemoryRouter>
      <MessageListCard message={TEST_MESSAGE} />
    </MemoryRouter>
  );
  const title = getByText("From: u2 about item i3");
  expect(title).toBeInTheDocument();
});
