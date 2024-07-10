import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProvider from "../UserProvider.jsx";
import ReportPage from "./ReportPage.jsx";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <ReportPage />
      </UserProvider>
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <ReportPage />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
