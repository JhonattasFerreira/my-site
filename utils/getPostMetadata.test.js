import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("fs");
vi.mock("gray-matter");

import fs from "fs";
import matter from "gray-matter";
import getPostMetadata from "./getPostMetadata";

const mockPosts = {
  "post-one": {
    filename: "post-one.en.md",
    content: "# Post One",
    data: { title: "Post One", date: "2024-03-10", gif: "/post-one.gif", altTextGif: "alt one" },
  },
  "post-two": {
    filename: "post-two.en.md",
    content: "# Post Two",
    data: { title: "Post Two", date: "2024-06-20", gif: "/post-two.gif", altTextGif: "alt two" },
  },
};

beforeEach(() => {
  vi.resetAllMocks();

  fs.readdirSync.mockImplementation((path) => {
    if (path === "content/posts/") return Object.keys(mockPosts);
    const folder = path.replace("content/posts/", "").replace("/", "");
    return mockPosts[folder] ? [mockPosts[folder].filename] : [];
  });

  fs.readFileSync.mockImplementation((path) => {
    const folder = Object.keys(mockPosts).find((key) => path.includes(key));
    return mockPosts[folder]?.content ?? "";
  });

  matter.mockImplementation((content) => {
    const post = Object.values(mockPosts).find((p) => p.content === content);
    return { data: post?.data ?? {} };
  });
});

describe("getPostMetadata", () => {
  it("returns posts sorted by date descending", () => {
    const result = getPostMetadata("content/posts", "en");
    expect(result[0].date).toBe("2024-06-20");
    expect(result[1].date).toBe("2024-03-10");
  });

  it("generates slug by removing language suffix from filename", () => {
    const result = getPostMetadata("content/posts", "en");
    expect(result.find((p) => p.title === "Post One").slug).toBe("post-one");
    expect(result.find((p) => p.title === "Post Two").slug).toBe("post-two");
  });

  it("maps frontmatter fields correctly", () => {
    const result = getPostMetadata("content/posts", "en");
    const post = result.find((p) => p.title === "Post One");
    expect(post.title).toBe("Post One");
    expect(post.date).toBe("2024-03-10");
    expect(post.gif).toBe("/post-one.gif");
    expect(post.altTextGif).toBe("alt one");
  });
});
