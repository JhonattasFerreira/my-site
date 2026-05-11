import { test, expect } from "@playwright/test";

test.describe("404 — not found", () => {
  test("unknown URL returns 404", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
  });

  test("unknown blog post returns 404", async ({ page }) => {
    const response = await page.goto("/en/blog/post-that-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});
