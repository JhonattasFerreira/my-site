import { test, expect } from "@playwright/test";

test.describe("Blog listing", () => {
  test("EN listing renders posts", async ({ page }) => {
    await page.goto("/en/blog");
    const articles = page.locator("article");
    await expect(articles.first()).toBeVisible();
    await expect(articles).toHaveCount(10);
  });

  test("PT-BR listing renders posts", async ({ page }) => {
    await page.goto("/pt-br/blog");
    const articles = page.locator("article");
    await expect(articles.first()).toBeVisible();
    await expect(articles).toHaveCount(10);
  });

  test("EN listing language switch points to PT-BR", async ({ page }) => {
    await page.goto("/en/blog");
    const langLink = page.getByRole("link", {
      name: "Change to Brazilian Portuguese",
    });
    await expect(langLink).toHaveAttribute("href", "/pt-br/blog");
  });

  test("PT-BR listing language switch points to EN", async ({ page }) => {
    await page.goto("/pt-br/blog");
    const langLink = page.getByRole("link", { name: "Change to English" });
    await expect(langLink).toHaveAttribute("href", "/en/blog");
  });

  test("post card links use correct URL format", async ({ page }) => {
    await page.goto("/en/blog");
    const firstArticleLink = page.locator("article a").first();
    await expect(firstArticleLink).toHaveAttribute("href", /^\/en\/blog\/.+/);
  });
});
