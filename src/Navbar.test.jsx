import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProvider from "./UserProvider.jsx";
import Navbar from "./Navbar.jsx";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Navbar />
      </UserProvider>
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Navbar />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
