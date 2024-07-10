import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProvider from "../UserProvider.jsx";
import { TEST_PURCHASE } from "../_testCommons.js";
import PurchaseCard from "./UserPurchasesCard.jsx";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <PurchaseCard item={TEST_PURCHASE} />
      </UserProvider>
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <PurchaseCard item={TEST_PURCHASE} />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

it("should have seller label and name", function () {
  const { getByText } = render(
    <MemoryRouter>
      <UserProvider>
        <PurchaseCard item={TEST_PURCHASE} />
      </UserProvider>
    </MemoryRouter>
  );

  const label = getByText("Seller:");
  const name = getByText("u3");
  expect(label).toBeInTheDocument();
  expect(name).toBeInTheDocument();
});

it("should have image", function () {
  const { container } = render(
    <MemoryRouter>
      <UserProvider>
        <PurchaseCard item={TEST_PURCHASE} />
      </UserProvider>
    </MemoryRouter>
  );

  const image = container.querySelector("img");

  expect(image).toBeInTheDocument();
});
