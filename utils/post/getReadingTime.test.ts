import { describe, it, expect } from "vitest";
import getReadingTime from "./getReadingTime";

describe("getReadingTime", () => {
  it("returns 1 for an empty string", () => {
    expect(getReadingTime("")).toBe(1);
  });

  it("returns 1 for content with fewer than 200 words", () => {
    const content = Array(100).fill("word").join(" ");
    expect(getReadingTime(content)).toBe(1);
  });

  it("returns 1 for exactly 200 words", () => {
    const content = Array(200).fill("word").join(" ");
    expect(getReadingTime(content)).toBe(1);
  });

  it("returns 2 for 201 words", () => {
    const content = Array(201).fill("word").join(" ");
    expect(getReadingTime(content)).toBe(2);
  });

  it("returns 2 for 400 words", () => {
    const content = Array(400).fill("word").join(" ");
    expect(getReadingTime(content)).toBe(2);
  });

  it("returns 3 for 401 words", () => {
    const content = Array(401).fill("word").join(" ");
    expect(getReadingTime(content)).toBe(3);
  });

  it("ignores markdown syntax characters when counting words", () => {
    const content = "## Heading\n\nSome **bold** and _italic_ text.";
    expect(getReadingTime(content)).toBe(1);
  });
});
