// @vitest-environment node
import { describe, it, expect } from "vitest";
import robots from "./robots";
import { BASE_URL } from "@/utils/constants";

describe("robots", () => {
  it("allows all user agents", () => {
    expect(robots().rules.userAgent).toBe("*");
  });

  it("allows access to all paths", () => {
    expect(robots().rules.allow).toBe("/");
  });

  it("points to the correct sitemap URL", () => {
    expect(robots().sitemap).toBe(`${BASE_URL}/sitemap.xml`);
  });
});
