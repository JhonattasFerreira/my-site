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

  test("html element has lang=en", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("skip link is present with correct href", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.getByText("Skip to main content");
    await expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  test("renders the main heading with Jhonattas", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Jhonattas");
  });
});
