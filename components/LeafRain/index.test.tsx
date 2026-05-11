import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import LeafRain from "./index";

describe("LeafRain", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders exactly 20 leaves", () => {
    render(<LeafRain onDone={() => {}} />);
    expect(screen.getAllByRole("img", { hidden: true })).toHaveLength(20);
  });

  it("calls onDone after the animation timeout", () => {
    const onDone = vi.fn();
    render(<LeafRain onDone={onDone} />);

    expect(onDone).not.toHaveBeenCalled();
    vi.runAllTimers();
    expect(onDone).toHaveBeenCalledOnce();
  });
});
