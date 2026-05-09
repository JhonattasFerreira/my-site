import { test, expect } from "@playwright/test";

const EN_POST_URL = "/en/blog/vectors-everywhere";
const PT_BR_POST_URL = "/pt-br/blog/vetores-em-todos-os-lugares";

test.describe("Post page — vectors-everywhere", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(EN_POST_URL);
  });

  test("cover GIF is rendered", async ({ page }) => {
    const coverImage = page.getByAltText(
      "A vaporwave-style GIF with a camera moving through a checkered road under rain, palm trees on the sides, mountains in the background, and a large moon in the sky."
    );
    await expect(coverImage).toBeVisible();
    await expect(coverImage).toHaveAttribute("src", /vector\.webp/);
  });

  test("static images in content are rendered", async ({ page }) => {
    const staticImage = page.getByAltText(
      "An image containing an arrow representing a vector. The arrow is black, and the background is white."
    );
    await expect(staticImage).toBeVisible();
    await expect(staticImage).toHaveAttribute("src", /vectorEuclid\.png/);
  });

  test("three p5.js iframes are rendered", async ({ page }) => {
    const iframes = page.locator(
      'iframe[title^="p5.js iframe sketch:"]'
    );
    await expect(iframes).toHaveCount(3);
    for (const iframe of await iframes.all()) {
      await expect(iframe).toBeVisible();
    }
  });

  test("p5.js iframes point to the correct sketch paths", async ({ page }) => {
    const expectedSrcs = [
      "/vectors-everywhere/p5Examples/bee/index.html",
      "/vectors-everywhere/p5Examples/ballWithVector/index.html",
      "/vectors-everywhere/p5Examples/ballFollowMouse/index.html",
    ];
    for (const src of expectedSrcs) {
      await expect(page.locator(`iframe[src="${src}"]`)).toBeVisible();
    }
  });

  test("internal link navigates to the linked post", async ({ page }) => {
    const internalLink = page
      .getByRole("link", { name: "previous chapter's post" })
      .first();
    await internalLink.click();
    await expect(page).toHaveURL("/en/blog/a-random-walker");
  });

  test("legacy blog URL redirects to new URL structure", async ({ page }) => {
    await page.goto("/blog/en/a-random-walker");
    await expect(page).toHaveURL("/en/blog/a-random-walker");
  });

  test("language switch navigates to PT-BR version", async ({ page }) => {
    const langLink = page.getByRole("link", {
      name: "Change to Brazilian Portuguese",
    });
    await expect(langLink).toHaveAttribute(
      "href",
      `/${PT_BR_POST_URL.slice(1)}`
    );
    await langLink.click();
    await expect(page).toHaveURL(PT_BR_POST_URL);
  });
});
