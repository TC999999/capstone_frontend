import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProvider from "../UserProvider.jsx";

import Conversation from "./Conversation.jsx";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Conversation />
      </UserProvider>
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Conversation />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
