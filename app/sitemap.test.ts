// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/utils/post/getPostMetadata");

import getPostMetadata from "@/utils/post/getPostMetadata";
import sitemap from "./sitemap";
import { BASE_URL, EN_LANGUAGE, PT_BR_LANGUAGE } from "@/utils/constants";
import type { PostMetadata } from "@/types";

const makePost = (slug: string, date: string): PostMetadata => ({
  slug,
  date,
  title: `Post ${slug}`,
  gif: "/cover.gif",
  altTextGif: "cover",
  description: "desc",
});

const enPosts = [makePost("post-one", "2024-01-01"), makePost("post-two", "2024-06-15")];
const ptPosts = [makePost("post-um", "2024-01-01"), makePost("post-dois", "2024-06-15")];

beforeEach(() => {
  vi.mocked(getPostMetadata).mockImplementation((_, lang) =>
    lang === EN_LANGUAGE ? enPosts : ptPosts
  );
});

describe("sitemap", () => {
  it("includes the three static pages", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(BASE_URL);
    expect(urls).toContain(`${BASE_URL}/en/blog`);
    expect(urls).toContain(`${BASE_URL}/pt-br/blog`);
  });

  it("assigns correct priorities to static pages", () => {
    const entries = sitemap();
    const home = entries.find((e) => e.url === BASE_URL);
    const enBlog = entries.find((e) => e.url === `${BASE_URL}/en/blog`);
    const ptBlog = entries.find((e) => e.url === `${BASE_URL}/pt-br/blog`);
    expect(home?.priority).toBe(1.0);
    expect(enBlog?.priority).toBe(0.8);
    expect(ptBlog?.priority).toBe(0.8);
  });

  it("generates correct EN post URLs", () => {
    const entries = sitemap();
    expect(entries.find((e) => e.url === `${BASE_URL}/en/blog/post-one`)).toBeDefined();
    expect(entries.find((e) => e.url === `${BASE_URL}/en/blog/post-two`)).toBeDefined();
  });

  it("generates correct PT-BR post URLs", () => {
    const entries = sitemap();
    expect(entries.find((e) => e.url === `${BASE_URL}/pt-br/blog/post-um`)).toBeDefined();
    expect(entries.find((e) => e.url === `${BASE_URL}/pt-br/blog/post-dois`)).toBeDefined();
  });

  it("sets post lastModified as a Date derived from post.date", () => {
    const entries = sitemap();
    const postEntry = entries.find((e) => e.url === `${BASE_URL}/en/blog/post-one`);
    expect(postEntry?.lastModified).toBeInstanceOf(Date);
    expect((postEntry?.lastModified as Date).getUTCFullYear()).toBe(2024);
  });

  it("assigns priority 0.64 to all post entries", () => {
    const entries = sitemap();
    const postEntries = entries.filter((e) => e.url.includes("/blog/post-"));
    expect(postEntries.every((e) => e.priority === 0.64)).toBe(true);
  });

  it("total entries equals 3 static plus all posts from both languages", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(3 + enPosts.length + ptPosts.length);
  });
});
