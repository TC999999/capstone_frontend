import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProvider from "../UserProvider.jsx";
import Reports from "./Reports.jsx";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Reports />
      </UserProvider>
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Reports />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
