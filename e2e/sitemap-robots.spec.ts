import { test, expect } from "@playwright/test";

test.describe("Sitemap and robots", () => {
  test("GET /sitemap.xml returns 200", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
  });

  test("sitemap contains the site base URL", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();
    expect(body).toContain("https://jhocore.com");
  });

  test("sitemap contains EN blog post URLs", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();
    expect(body).toContain("/en/blog/");
  });

  test("sitemap contains PT-BR blog post URLs", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();
    expect(body).toContain("/pt-br/blog/");
  });

  test("GET /robots.txt returns 200", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
  });

  test("robots.txt references the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    const body = await response.text();
    expect(body).toContain("sitemap.xml");
  });
});
