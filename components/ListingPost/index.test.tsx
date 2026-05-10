import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ListingPost from "./index";
import { makePostMetadata } from "@/test/fixtures/posts";

const makePosts = makePostMetadata;

describe("ListingPost", () => {
  describe("EN language", () => {
    it("displays the English title", () => {
      render(<ListingPost postMetadata={makePosts(1)} language="en" />);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Last Blog Posts"
      );
    });

    it("displays a link to the Portuguese version", () => {
      render(<ListingPost postMetadata={makePosts(1)} language="en" />);
      expect(
        screen.getByRole("link", { name: /change to brazilian portuguese/i })
      ).toHaveAttribute("href", "/pt-br/blog");
    });
  });

  describe("PT-BR language", () => {
    it("displays the Portuguese title", () => {
      render(<ListingPost postMetadata={makePosts(1)} language="pt-br" />);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Últimas Postagens"
      );
    });

    it("displays a link to the English version", () => {
      render(<ListingPost postMetadata={makePosts(1)} language="pt-br" />);
      expect(
        screen.getByRole("link", { name: /change to english/i })
      ).toHaveAttribute("href", "/en/blog");
    });
  });

  describe("image priority", () => {
    it("gives the first post eager loading", () => {
      render(<ListingPost postMetadata={makePosts(3)} language="en" />);
      const images = screen.getAllByRole("img");
      expect(images[0]).toHaveAttribute("loading", "eager");
    });

    it("gives remaining posts lazy loading", () => {
      render(<ListingPost postMetadata={makePosts(3)} language="en" />);
      const images = screen.getAllByRole("img");
      expect(images[1]).toHaveAttribute("loading", "lazy");
      expect(images[2]).toHaveAttribute("loading", "lazy");
    });
  });

  describe("post links", () => {
    it("links each post to the correct URL for the given language", () => {
      const posts = makePosts(1);
      render(<ListingPost postMetadata={posts} language="en" />);
      expect(
        screen.getByRole("link", { name: /post 0 cover/i })
      ).toHaveAttribute("href", "/en/blog/post-0");
    });
  });

  describe("accessibility", () => {
    it("main element has id for skip link target", () => {
      render(<ListingPost postMetadata={makePosts(1)} language="en" />);
      expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    });
  });
});
