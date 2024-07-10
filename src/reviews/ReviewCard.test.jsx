import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProvider from "../UserProvider.jsx";
import { TEST_REVIEW } from "../_testCommons.js";
import ReviewCard from "./ReviewCard.jsx";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <ReviewCard review={TEST_REVIEW} />
      </UserProvider>
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <ReviewCard review={TEST_REVIEW} stars={"⭐⭐⭐⭐⭐"} />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

it("should have reviewer review card class", function () {
  const { container } = render(
    <MemoryRouter>
      <UserProvider>
        <ReviewCard review={TEST_REVIEW} stars={"⭐⭐⭐⭐⭐"} />
      </UserProvider>
    </MemoryRouter>
  );

  const reviewCard = container.querySelector(".review-card");
  expect(reviewCard).toBeInTheDocument();
});

it("should have reviewer name of u1 and body", function () {
  const { getByText } = render(
    <MemoryRouter>
      <UserProvider>
        <ReviewCard review={TEST_REVIEW} stars={"⭐⭐⭐⭐⭐"} />
      </UserProvider>
    </MemoryRouter>
  );

  const name = getByText("u1");
  const body = getByText("test review");
  expect(name).toBeInTheDocument();
  expect(body).toBeInTheDocument();
});
