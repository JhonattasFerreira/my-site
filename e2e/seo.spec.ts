import { test, expect } from "@playwright/test";

const EN_POST_URL = "/en/blog/a-random-walker";
const EN_BLOG_URL = "/en/blog";
const PT_BR_BLOG_URL = "/pt-br/blog";

test.describe("SEO meta tags", () => {
  test("EN post has a non-empty og:title", async ({ page }) => {
    await page.goto(EN_POST_URL);
    const ogTitle = page.locator('meta[property="og:title"]');
    const content = await ogTitle.getAttribute("content");
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(0);
  });

  test("EN post has a non-empty meta description", async ({ page }) => {
    await page.goto(EN_POST_URL);
    const metaDesc = page.locator('meta[name="description"]');
    const content = await metaDesc.getAttribute("content");
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(0);
  });

  test("EN blog listing has hreflang pointing to PT-BR", async ({ page }) => {
    await page.goto(EN_BLOG_URL);
    const hreflangPtBr = page.locator('link[rel="alternate"][hreflang="pt-BR"]');
    const href = await hreflangPtBr.getAttribute("href");
    expect(href).toContain("/pt-br/blog");
  });

  test("PT-BR blog listing has hreflang pointing to EN", async ({ page }) => {
    await page.goto(PT_BR_BLOG_URL);
    const hreflangEn = page.locator('link[rel="alternate"][hreflang="en"]');
    const href = await hreflangEn.getAttribute("href");
    expect(href).toContain("/en/blog");
  });
});
