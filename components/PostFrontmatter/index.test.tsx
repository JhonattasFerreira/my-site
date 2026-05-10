import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PostFrontmatterLayout from "./index";

const baseProps = {
  title: "Test Post",
  date: "2024-01-15",
  language: "en" as const,
  oppositeUrl: "test-post",
  gif: "/test/cover.gif",
  altTextGif: "Test cover",
  description: "A test post",
  readingTime: 5,
  children: <p>Post content</p>,
};

describe("PostFrontmatter", () => {
  describe("reading time", () => {
    it("displays reading time in English", () => {
      render(<PostFrontmatterLayout {...baseProps} />);
      expect(screen.getByText(/5 min read/i)).toBeInTheDocument();
    });

    it("displays reading time in Portuguese", () => {
      render(
        <PostFrontmatterLayout {...baseProps} language="pt-br" />
      );
      expect(screen.getByText(/5 min de leitura/i)).toBeInTheDocument();
    });
  });
});
