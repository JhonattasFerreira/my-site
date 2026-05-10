import { test, expect } from "@playwright/test";

test.describe("html lang attribute", () => {
  test("EN blog listing sets lang=en", async ({ page }) => {
    await page.goto("/en/blog");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("PT-BR blog listing sets lang=pt-br", async ({ page }) => {
    await page.goto("/pt-br/blog");
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-br");
  });

  test("EN post page sets lang=en", async ({ page }) => {
    await page.goto("/en/blog/a-random-walker");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("PT-BR post page sets lang=pt-br", async ({ page }) => {
    await page.goto("/pt-br/blog/um-caminhante-aleatorio");
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-br");
  });
});
