import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProvider from "./UserProvider.jsx";
import HomePage from "./HomePage.jsx";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <HomePage />
      </UserProvider>
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <HomePage />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

it("should have a header", function () {
  const { getByText } = render(
    <MemoryRouter>
      <UserProvider>
        <HomePage />
      </UserProvider>
    </MemoryRouter>
  );

  const header = getByText("Welcome to The Worldwide Garage Sale!");
  expect(header).toBeInTheDocument;
});
