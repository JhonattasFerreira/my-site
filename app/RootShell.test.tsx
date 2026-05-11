// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/components/AnalyticsProviders", () => ({
  default: () => null,
}));

vi.mock("./fonts", () => ({
  raleway: { className: "raleway-mock" },
}));

import RootShell from "./RootShell";

describe("RootShell", () => {
  it("renders children", () => {
    render(
      <RootShell lang="en">
        <main>Page content</main>
      </RootShell>
    );
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("renders the skip link with the correct href", () => {
    render(<RootShell lang="en"><div /></RootShell>);
    const skipLink = screen.getByText("Skip to main content");
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("renders multiple children", () => {
    render(
      <RootShell lang="en">
        <nav>Nav</nav>
        <main>Main</main>
      </RootShell>
    );
    expect(screen.getByText("Nav")).toBeInTheDocument();
    expect(screen.getByText("Main")).toBeInTheDocument();
  });
});
