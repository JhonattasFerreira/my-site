// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/font/google", () => ({
  Jersey_10: () => ({ className: "jersey-10-mock" }),
}));

import Home from "./page";

beforeAll(() => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  );
});

describe("Home page", () => {
  describe("accessibility", () => {
    it("renders a visible h1 with the main heading text", () => {
      render(<Home />);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/Jhonattas/);
    });

    it("main element has id for skip link target", () => {
      render(<Home />);
      expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    });
  });
});
