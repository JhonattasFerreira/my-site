import getPostMetadata from "@/utils/post/getPostMetadata";
import {
  CONTENT_FOLDER,
  EN_LANGUAGE,
  PT_BR_LANGUAGE,
  BASE_URL,
} from "@/utils/constants";

export default function sitemap() {
  const enPosts = getPostMetadata(CONTENT_FOLDER, EN_LANGUAGE);
  const ptPosts = getPostMetadata(CONTENT_FOLDER, PT_BR_LANGUAGE);

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0 },
    { url: `${BASE_URL}/en/blog`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/pt-br/blog`, lastModified: new Date(), priority: 0.8 },
  ];

  const enPostPages = enPosts.map((post) => ({
    url: `${BASE_URL}/en/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.64,
  }));

  const ptPostPages = ptPosts.map((post) => ({
    url: `${BASE_URL}/pt-br/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.64,
  }));

  return [...staticPages, ...enPostPages, ...ptPostPages];
}
