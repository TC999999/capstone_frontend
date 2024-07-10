import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProvider from "../UserProvider.jsx";
import NewMessage from "./NewMessage.jsx";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <NewMessage />
      </UserProvider>
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <NewMessage />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
