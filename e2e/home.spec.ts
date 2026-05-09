import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads successfully", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });

  test("navigates to EN blog via nav link", async ({ page }) => {
    await page.goto("/");
    await page.locator("nav").getByRole("link", { name: "Blog" }).click();
    await expect(page).toHaveURL("/en/blog");
  });
});
