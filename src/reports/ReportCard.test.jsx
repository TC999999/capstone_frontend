import { render } from "@testing-library/react";
import ReportCard from "./ReportCard.jsx";
import { TEST_REPORT } from "../_testCommons.js";
import { MemoryRouter } from "react-router-dom";
it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <ReportCard report={TEST_REPORT} />
    </MemoryRouter>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <ReportCard report={TEST_REPORT} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
