import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProvider from "../UserProvider.jsx";
import { TEST_USER } from "../_testCommons.js";
import UserCard from "./UserCard.jsx";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <UserCard
          user={TEST_USER}
          sameUser={true}
          rating={10}
          stars={"⭐⭐⭐⭐⭐"}
        />
      </UserProvider>
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <UserCard
          user={TEST_USER}
          sameUser={true}
          rating={10}
          stars={"⭐⭐⭐⭐⭐"}
        />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

it("should show first name when same user", function () {
  const { getByText } = render(
    <MemoryRouter>
      <UserProvider>
        <UserCard
          user={TEST_USER}
          sameUser={true}
          rating={10}
          stars={"⭐⭐⭐⭐⭐"}
        />
      </UserProvider>
    </MemoryRouter>
  );

  const firstName = getByText("fn1");
  expect(firstName).toBeInTheDocument();
});

it("should not show first name when different user", function () {
  const { queryByText } = render(
    <MemoryRouter>
      <UserProvider>
        <UserCard
          user={TEST_USER}
          sameUser={false}
          rating={10}
          stars={"⭐⭐⭐⭐⭐"}
        />
      </UserProvider>
    </MemoryRouter>
  );

  expect(queryByText("fn1")).not.toBeInTheDocument();
});
