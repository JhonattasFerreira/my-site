import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import IframeP5 from "./index";

describe("IframeP5", () => {
  it("appends /index.html to the iframe src", () => {
    render(<IframeP5 src="/my-post/p5Examples/sketch" metadata="Simple Walker $ https://github.com/foo" />);
    const iframe = screen.getByTitle(/p5\.js iframe sketch/i);
    expect(iframe).toHaveAttribute("src", "/my-post/p5Examples/sketch/index.html");
  });

  it("uses the title from metadata as the iframe title attribute", () => {
    render(<IframeP5 src="/my-post/p5Examples/sketch" metadata="Simple Walker $ https://github.com/foo" />);
    expect(screen.getByTitle("p5.js iframe sketch: Simple Walker")).toBeInTheDocument();
  });

  it("renders the Source Code link pointing to the correct URL", () => {
    render(<IframeP5 src="/my-post/p5Examples/sketch" metadata="Simple Walker $ https://github.com/foo" />);
    const link = screen.getByRole("link", { name: /source code/i });
    expect(link).toHaveAttribute("href", "https://github.com/foo");
  });

  it("opens the Source Code link in a new tab", () => {
    render(<IframeP5 src="/my-post/p5Examples/sketch" metadata="Simple Walker $ https://github.com/foo" />);
    const link = screen.getByRole("link", { name: /source code/i });
    expect(link).toHaveAttribute("target", "_blank");
  });
});
