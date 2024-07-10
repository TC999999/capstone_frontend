import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProvider from "../UserProvider.jsx";
import SignUp from "./SignUp.jsx";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <SignUp />
      </UserProvider>
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <SignUp />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

it("should have more than just username an password inputs", function () {
  const { container } = render(
    <MemoryRouter>
      <UserProvider>
        <SignUp />
      </UserProvider>
    </MemoryRouter>
  );

  const username_input = container.querySelector("#signup_username");
  const password_input = container.querySelector("#signup_password");
  const firstname_input = container.querySelector("#firstName");
  const lastname_input = container.querySelector("#lastName");

  expect(username_input).toBeInTheDocument();
  expect(password_input).toBeInTheDocument();
  expect(firstname_input).toBeInTheDocument();
  expect(lastname_input).toBeInTheDocument();
});
