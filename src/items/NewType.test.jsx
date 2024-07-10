import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProvider from "../UserProvider.jsx";
import NewType from "./NewType.jsx";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <NewType />
      </UserProvider>
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <NewType />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
