// import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "./App.jsx";

it("renders without crashing", function () {
  render(<App />);
});