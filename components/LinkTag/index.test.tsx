import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LinkTag from "./index";

describe("LinkTag", () => {
  describe("when href is absent", () => {
    it("renders only the content with no link wrapper", () => {
      render(<LinkTag>text without link</LinkTag>);
      expect(screen.getByText("text without link")).toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
  });

  describe("when href is an internal blog link", () => {
    it("renders a link for /en/blog/", () => {
      render(<LinkTag href="/en/blog/my-post">my post</LinkTag>);
      expect(screen.getByRole("link", { name: "my post" })).toHaveAttribute(
        "href",
        "/en/blog/my-post"
      );
    });

    it("renders a link for /pt-br/blog/", () => {
      render(<LinkTag href="/pt-br/blog/meu-post">meu post</LinkTag>);
      expect(screen.getByRole("link", { name: "meu post" })).toHaveAttribute(
        "href",
        "/pt-br/blog/meu-post"
      );
    });

    it("does not open in a new tab", () => {
      render(<LinkTag href="/en/blog/my-post">my post</LinkTag>);
      expect(screen.getByRole("link")).not.toHaveAttribute("target", "_blank");
    });
  });

  describe("when href is an external link", () => {
    it("opens in a new tab", () => {
      render(<LinkTag href="https://github.com">GitHub</LinkTag>);
      expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
        "target",
        "_blank"
      );
    });

    it("has rel=noopener noreferrer", () => {
      render(<LinkTag href="https://github.com">GitHub</LinkTag>);
      expect(screen.getByRole("link")).toHaveAttribute(
        "rel",
        "noopener noreferrer"
      );
    });
  });
});
