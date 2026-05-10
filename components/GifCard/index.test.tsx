import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import GifCard from "./index";

describe("GifCard", () => {
  const defaultProps = {
    src: "/test/cover.gif",
    alt: "Test cover",
    priority: false,
    loading: "lazy" as const,
  };

  it("renders the image with the correct alt text", () => {
    render(<GifCard {...defaultProps} />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Test cover");
  });

  it("shows the shimmer wrapper before the image loads", () => {
    const { container } = render(<GifCard {...defaultProps} />);
    expect(container.querySelector("[data-shimmer='true']")).toBeInTheDocument();
  });

  it("hides the shimmer after the image fires onLoad", async () => {
    const { container } = render(<GifCard {...defaultProps} />);
    await act(async () => {
      fireEvent.load(screen.getByRole("img"));
    });
    expect(
      container.querySelector("[data-shimmer='true']")
    ).not.toBeInTheDocument();
  });

  it("applies eager loading when priority is true", () => {
    render(<GifCard {...defaultProps} priority={true} loading="eager" />);
    expect(screen.getByRole("img")).toHaveAttribute("loading", "eager");
  });
});
