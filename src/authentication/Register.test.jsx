import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProvider from "../UserProvider.jsx";
import Register from "./Register.jsx";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Register />
      </UserProvider>
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Register />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

it("should have both regsiter and signup forms", function () {
  const { container } = render(
    <MemoryRouter>
      <UserProvider>
        <Register />
      </UserProvider>
    </MemoryRouter>
  );

  const login_form = container.querySelector(".login-form");
  const signup_form = container.querySelector(".signup-form");
  expect(login_form).toBeInTheDocument();
  expect(signup_form).toBeInTheDocument();
});
