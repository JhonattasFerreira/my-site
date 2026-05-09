export function isInternalBlogLink(href) {
  return href.startsWith("/en/blog/") || href.startsWith("/pt-br/blog/");
}
