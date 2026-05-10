import type { PostMetadata } from "@/types";

export const makePostMetadata = (count: number): PostMetadata[] =>
  Array.from({ length: count }, (_, i) => ({
    slug: `post-${i}`,
    title: `Post ${i}`,
    date: "2024-01-01",
    gif: `/post-${i}/cover.gif`,
    altTextGif: `post ${i} cover`,
    description: `Description of post ${i}`,
  }));
