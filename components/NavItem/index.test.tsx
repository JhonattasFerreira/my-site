import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NavItem from "./index";

describe("NavItem", () => {
  it("renders the link with the correct href", () => {
    render(<NavItem item={{ name: "Blog", url: "/en/blog" }} />);
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/en/blog"
    );
  });

  it("renders the item name as the link label", () => {
    render(<NavItem item={{ name: "Home", url: "/" }} />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  });

  it("renders children when provided", () => {
    render(
      <NavItem item={{ name: "Blog", url: "/en/blog" }}>
        <span>extra</span>
      </NavItem>
    );
    expect(screen.getByText("extra")).toBeInTheDocument();
  });
});
