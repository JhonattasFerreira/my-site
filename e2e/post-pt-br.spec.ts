import { test, expect } from "@playwright/test";

const PT_BR_POST_URL = "/pt-br/blog/um-caminhante-aleatorio";
const EN_POST_URL = "/en/blog/a-random-walker";

test.describe("Post page — PT-BR", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PT_BR_POST_URL);
  });

  test("renders the post title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Um Caminhante Aleatório" })
    ).toBeVisible();
  });

  test("renders the cover image", async ({ page }) => {
    const cover = page.getByAltText(
      "Um GIF de uma menina caminhando com um fundo colorido estático."
    );
    await expect(cover).toBeVisible();
  });

  test("language switch points to the EN version", async ({ page }) => {
    const langLink = page.getByRole("link", { name: "Change to English" });
    await expect(langLink).toHaveAttribute("href", EN_POST_URL);
  });

  test("language switch navigates to the EN post", async ({ page }) => {
    await page.getByRole("link", { name: "Change to English" }).click();
    await expect(page).toHaveURL(EN_POST_URL);
  });
});
