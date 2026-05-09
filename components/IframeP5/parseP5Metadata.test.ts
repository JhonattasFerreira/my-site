import { describe, it, expect } from "vitest";
import { parseP5Metadata } from "./parseP5Metadata.js";

describe("parseP5Metadata", () => {
  it("parses a valid metadata string", () => {
    const result = parseP5Metadata("Simple Walker $ https://github.com/foo");
    expect(result.title).toBe("Simple Walker");
    expect(result.url).toBe("https://github.com/foo");
  });

  it("throws when the separator is missing", () => {
    expect(() => parseP5Metadata("Simple Walker")).toThrow(
      "Invalid p5 metadata format"
    );
  });

  it("throws when title is empty", () => {
    expect(() => parseP5Metadata(" $ https://github.com/foo")).toThrow(
      "Invalid p5 metadata format"
    );
  });

  it("throws when url is empty", () => {
    expect(() => parseP5Metadata("Simple Walker $ ")).toThrow(
      "Invalid p5 metadata format"
    );
  });

  it("throws when metadata is an empty string", () => {
    expect(() => parseP5Metadata("")).toThrow("Invalid p5 metadata format");
  });
});
