// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("fs");
vi.mock("gray-matter");

import fs from "fs";
import matter from "gray-matter";
import getPostContent from "./getPostContent";

const enFile = "obs-on-linux.en.md";
const ptFile = "obs-no-linux.pt-br.md";
const fileContent = "# Post content";
const frontmatterData = { title: "OBS on Linux", date: "2024-01-01" };

const mockReaddirSync = vi.mocked(fs.readdirSync);
const mockReadFileSync = vi.mocked(fs.readFileSync);
const mockMatter = vi.mocked(matter);

beforeEach(() => {
  vi.resetAllMocks();

  mockReaddirSync.mockImplementation(((path: string) => {
    if (path === "content/posts/") return ["obs-on-linux"];
    if (path === "content/posts/obs-on-linux/") return [enFile, ptFile];
    return [];
  }) as typeof fs.readdirSync);

  mockReadFileSync.mockImplementation((() => fileContent) as unknown as typeof fs.readFileSync);

  mockMatter.mockReturnValue(
    { data: frontmatterData, content: fileContent } as unknown as ReturnType<typeof matter>
  );
});

describe("getPostContent", () => {
  it("finds the correct file by slug", () => {
    getPostContent("obs-on-linux", ".pt-br.md");
    expect(fs.readFileSync).toHaveBeenCalledWith(
      expect.stringContaining(enFile),
      "utf8"
    );
  });

  it("returns data and content from frontmatter", () => {
    const result = getPostContent("obs-on-linux", ".pt-br.md");
    expect(result.data).toEqual(frontmatterData);
    expect(result.content).toBe(fileContent);
  });

  it("returns oppositeUrl by removing the filenameEnd suffix", () => {
    const result = getPostContent("obs-on-linux", ".pt-br.md");
    expect(result.oppositeUrl).toBe("obs-no-linux");
  });

  it("returns oppositeUrl for the other language direction", () => {
    mockReaddirSync.mockImplementation(((path: string) => {
      if (path === "content/posts/") return ["obs-on-linux"];
      if (path === "content/posts/obs-on-linux/") return [ptFile, enFile];
      return [];
    }) as typeof fs.readdirSync);
    const result = getPostContent("obs-no-linux", ".en.md");
    expect(result.oppositeUrl).toBe("obs-on-linux");
  });

  it("throws when slug is not found in any folder", () => {
    mockReaddirSync.mockImplementation(((path: string) => {
      if (path === "content/posts/") return ["obs-on-linux"];
      if (path === "content/posts/obs-on-linux/") return ["other-file.en.md"];
      return [];
    }) as typeof fs.readdirSync);
    expect(() => getPostContent("nonexistent-slug", ".pt-br.md")).toThrow(
      'Post not found for slug: "nonexistent-slug"'
    );
  });
});
