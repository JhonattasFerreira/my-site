import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SocialFooter from "./index";

describe("SocialFooter", () => {
  it("renders the LinkedIn link pointing to the correct URL", () => {
    render(<SocialFooter />);
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/jhonattasferreira/"
    );
  });

  it("renders the GitHub link pointing to the correct URL", () => {
    render(<SocialFooter />);
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/JhonattasFerreira"
    );
  });

  it("opens the LinkedIn link in a new tab", () => {
    render(<SocialFooter />);
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "target",
      "_blank"
    );
  });

  it("opens the GitHub link in a new tab", () => {
    render(<SocialFooter />);
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "target",
      "_blank"
    );
  });
});
