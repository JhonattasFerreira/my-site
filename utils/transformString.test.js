import { describe, it, expect } from "vitest";
import transformString from "./transformString";

describe("transformString", () => {
  it("returns empty string for empty input", () => {
    expect(transformString("")).toBe("");
  });

  it("returns empty string for whitespace-only input", () => {
    expect(transformString("   ")).toBe("");
  });

  it("capitalizes a single word slug", () => {
    expect(transformString("blog")).toBe("Blog");
  });

  it("capitalizes each word separated by hyphens", () => {
    expect(transformString("obs-on-linux")).toBe("Obs On Linux");
  });

  it("handles slugs with many hyphens", () => {
    expect(transformString("the-linux-command-ccwc")).toBe(
      "The Linux Command Ccwc"
    );
  });
});
