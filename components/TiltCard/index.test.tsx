import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TiltCard from "./index";

describe("TiltCard", () => {
  const mockRect = {
    left: 0,
    top: 0,
    width: 200,
    height: 100,
    right: 200,
    bottom: 100,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  };

  const getWrapper = () => screen.getByRole("article").parentElement!;

  it("renders children inside an article", () => {
    render(<TiltCard><span>content</span></TiltCard>);
    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("applies rotateX and rotateY on mouse move", () => {
    render(<TiltCard><span>content</span></TiltCard>);
    const wrapper = getWrapper();
    wrapper.getBoundingClientRect = () => mockRect;

    // clientX=150 → x=0.75 → rotateY=(0.75-0.5)*12= 3°
    // clientY=25  → y=0.25 → rotateX=(0.5-0.25)*12= 3°
    fireEvent.mouseMove(wrapper, { clientX: 150, clientY: 25 });

    expect(screen.getByRole("article").style.transform).toBe(
      "rotateX(3deg) rotateY(3deg)"
    );
  });

  it("resets transform to zero on mouse leave", () => {
    render(<TiltCard><span>content</span></TiltCard>);
    const wrapper = getWrapper();
    wrapper.getBoundingClientRect = () => mockRect;

    fireEvent.mouseMove(wrapper, { clientX: 150, clientY: 25 });
    fireEvent.mouseLeave(wrapper);

    expect(screen.getByRole("article").style.transform).toBe(
      "rotateX(0deg) rotateY(0deg)"
    );
  });

  it("passes className to the article", () => {
    render(<TiltCard articleClassName="my-class"><span>content</span></TiltCard>);
    expect(screen.getByRole("article").classList.contains("my-class")).toBe(true);
  });
});
