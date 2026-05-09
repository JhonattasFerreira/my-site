import { describe, it, expect } from "vitest";
import { isInternalBlogLink } from "./isInternalBlogLink.js";

describe("isInternalBlogLink", () => {
  it("returns true for /en/blog/ links", () => {
    expect(isInternalBlogLink("/en/blog/my-post")).toBe(true);
  });

  it("returns true for /pt-br/blog/ links", () => {
    expect(isInternalBlogLink("/pt-br/blog/meu-post")).toBe(true);
  });

  it("returns true for legacy /blog/en/ links", () => {
    expect(isInternalBlogLink("/blog/en/my-post")).toBe(true);
  });

  it("returns true for legacy /blog/pt-br/ links", () => {
    expect(isInternalBlogLink("/blog/pt-br/meu-post")).toBe(true);
  });

  it("returns false for external https links", () => {
    expect(isInternalBlogLink("https://github.com")).toBe(false);
  });

  it("returns false for external http links", () => {
    expect(isInternalBlogLink("http://example.com/en/blog/post")).toBe(false);
  });
});
