// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProgressBar from "./index";

describe("ProgressBar", () => {
  it("renders a progressbar element", () => {
    render(<ProgressBar />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("starts at zero progress", () => {
    render(<ProgressBar />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });
});
