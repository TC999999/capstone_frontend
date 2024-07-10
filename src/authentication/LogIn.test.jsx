import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProvider from "../UserProvider.jsx";
import LogIn from "./LogIn.jsx";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <LogIn />
      </UserProvider>
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <LogIn />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

it("should have only username an password inputs", function () {
  const { container } = render(
    <MemoryRouter>
      <UserProvider>
        <LogIn />
      </UserProvider>
    </MemoryRouter>
  );

  const username_input = container.querySelector("#login_username");
  const password_input = container.querySelector("#login_password");
  const firstname_input = container.querySelector("#firstName");
  const lastname_input = container.querySelector("#lastName");

  expect(username_input).toBeInTheDocument();
  expect(password_input).toBeInTheDocument();
  expect(firstname_input).not.toBeInTheDocument();
  expect(lastname_input).not.toBeInTheDocument();
});
