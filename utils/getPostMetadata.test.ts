// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("fs");
vi.mock("gray-matter");

import fs from "fs";
import matter from "gray-matter";
import getPostMetadata from "./getPostMetadata";

const mockPosts: Record<string, { filename: string; content: string; data: { title: string; date: string; gif: string; altTextGif: string } }> = {
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

const mockReaddirSync = vi.mocked(fs.readdirSync) as unknown as ReturnType<typeof vi.fn>;
const mockReadFileSync = vi.mocked(fs.readFileSync) as unknown as ReturnType<typeof vi.fn>;
const mockMatter = vi.mocked(matter) as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.resetAllMocks();

  mockReaddirSync.mockImplementation((path: string) => {
    if (path === "content/posts/") return Object.keys(mockPosts);
    const folder = path.replace("content/posts/", "").replace("/", "");
    return mockPosts[folder] ? [mockPosts[folder].filename] : [];
  });

  mockReadFileSync.mockImplementation((path: string) => {
    const folder = Object.keys(mockPosts).find((key) => path.includes(key));
    return folder ? mockPosts[folder].content : "";
  });

  mockMatter.mockImplementation((content: string) => {
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
    expect(result.find((p) => p.title === "Post One")?.slug).toBe("post-one");
    expect(result.find((p) => p.title === "Post Two")?.slug).toBe("post-two");
  });

  it("maps frontmatter fields correctly", () => {
    const result = getPostMetadata("content/posts", "en");
    const post = result.find((p) => p.title === "Post One");
    expect(post?.title).toBe("Post One");
    expect(post?.date).toBe("2024-03-10");
    expect(post?.gif).toBe("/post-one.gif");
    expect(post?.altTextGif).toBe("alt one");
  });

  it("skips posts that have no file for the requested language", () => {
    mockReaddirSync.mockImplementation((path: string) => {
      if (path === "content/posts/") return ["post-one", "pt-only-post"];
      if (path === "content/posts/post-one/") return ["post-one.en.md"];
      if (path === "content/posts/pt-only-post/") return ["pt-only-post.pt-br.md"];
      return [];
    });
    const result = getPostMetadata("content/posts", "en");
    expect(result.length).toBe(1);
    expect(result[0].slug).toBe("post-one");
  });
});
