import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ImageBlock from "./index";

vi.mock("next/image");

describe("ImageBlock", () => {
  describe("when src contains p5Examples", () => {
    it("renders an iframe instead of an image", () => {
      render(
        <ImageBlock
          src="/my-post/p5Examples/sketch"
          alt="Simple Walker $ https://github.com/foo"
        />
      );
      expect(screen.getByTitle(/p5\.js iframe sketch/i)).toBeInTheDocument();
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("appends /index.html to the iframe src", () => {
      render(
        <ImageBlock
          src="/my-post/p5Examples/sketch"
          alt="Simple Walker $ https://github.com/foo"
        />
      );
      const iframe = screen.getByTitle(/p5\.js iframe sketch/i);
      expect(iframe).toHaveAttribute("src", "/my-post/p5Examples/sketch/index.html");
    });
  });

  describe("when src is a regular image", () => {
    it("renders an image instead of an iframe", () => {
      render(<ImageBlock src="/my-post/cover.png" alt="post cover" />);
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.queryByTitle(/p5\.js iframe sketch/i)).not.toBeInTheDocument();
    });

    it("uses lazy loading for non-gif and non-webp images", () => {
      render(<ImageBlock src="/my-post/cover.png" alt="post cover" />);
      expect(screen.getByRole("img")).toHaveAttribute("loading", "lazy");
    });
  });

  describe("when src is a gif or webp", () => {
    it("uses eager loading for gif", () => {
      render(<ImageBlock src="/my-post/cover.gif" alt="animated cover" />);
      expect(screen.getByRole("img")).toHaveAttribute("loading", "eager");
    });

    it("uses eager loading for webp", () => {
      render(<ImageBlock src="/my-post/cover.webp" alt="animated cover" />);
      expect(screen.getByRole("img")).toHaveAttribute("loading", "eager");
    });
  });

  describe("unoptimized attribute", () => {
    it("gif is unoptimized to preserve animation", () => {
      render(<ImageBlock src="/my-post/cover.gif" alt="animated cover" />);
      expect(screen.getByRole("img")).toHaveAttribute("data-unoptimized", "true");
    });

    it("webp is not unoptimized so Next.js can compress it", () => {
      render(<ImageBlock src="/my-post/cover.webp" alt="cover" />);
      expect(screen.getByRole("img")).not.toHaveAttribute("data-unoptimized");
    });

    it("png is not unoptimized so Next.js can compress it", () => {
      render(<ImageBlock src="/my-post/cover.png" alt="cover" />);
      expect(screen.getByRole("img")).not.toHaveAttribute("data-unoptimized");
    });
  });
});
