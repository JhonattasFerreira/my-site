// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ProgressBar from "./index";

vi.mock("./useScrollProgress");

import useScrollProgress from "./useScrollProgress";

describe("ProgressBar", () => {
  beforeEach(() => {
    vi.mocked(useScrollProgress).mockReturnValue({ progress: 0, scrolled: false });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a progressbar element", () => {
    render(<ProgressBar />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("starts at zero progress", () => {
    render(<ProgressBar />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("does not render LeafRain when progress is below 100", () => {
    vi.mocked(useScrollProgress).mockReturnValue({ progress: 80, scrolled: true });
    render(<ProgressBar />);
    expect(screen.queryAllByRole("img", { hidden: true })).toHaveLength(0);
  });

  it("renders LeafRain when progress reaches 100", () => {
    vi.mocked(useScrollProgress).mockReturnValue({ progress: 100, scrolled: true });
    render(<ProgressBar />);
    expect(screen.getAllByRole("img", { hidden: true })).toHaveLength(20);
  });
});
