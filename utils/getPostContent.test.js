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

beforeEach(() => {
  vi.resetAllMocks();

  fs.readdirSync.mockImplementation((path) => {
    if (path === "content/posts/") return ["obs-on-linux"];
    if (path === "content/posts/obs-on-linux/") return [enFile, ptFile];
    return [];
  });

  fs.readFileSync.mockReturnValue(fileContent);

  matter.mockReturnValue({ data: frontmatterData, content: fileContent });
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
    fs.readdirSync.mockImplementation((path) => {
      if (path === "content/posts/") return ["obs-on-linux"];
      if (path === "content/posts/obs-on-linux/") return [ptFile, enFile];
      return [];
    });
    const result = getPostContent("obs-no-linux", ".en.md");
    expect(result.oppositeUrl).toBe("obs-on-linux");
  });

  it("throws when slug is not found in any folder", () => {
    fs.readdirSync.mockImplementation((path) => {
      if (path === "content/posts/") return ["obs-on-linux"];
      if (path === "content/posts/obs-on-linux/") return ["other-file.en.md"];
      return [];
    });
    expect(() => getPostContent("nonexistent-slug", ".pt-br.md")).toThrow(
      'Post not found for slug: "nonexistent-slug"'
    );
  });
});
