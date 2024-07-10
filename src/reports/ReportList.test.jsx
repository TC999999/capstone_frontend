import { render } from "@testing-library/react";
import ReportList from "./ReportList.jsx";
import { TEST_REPORTS } from "../_testCommons.js";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <ReportList reports={TEST_REPORTS} />
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <ReportList reports={TEST_REPORTS} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have report-list", function () {
  const { container } = render(
    <MemoryRouter>
      <ReportList reports={TEST_REPORTS} />
    </MemoryRouter>
  );
  const reports = container.querySelector(".report-list-page-div");
  expect(reports).toBeInTheDocument();
});
