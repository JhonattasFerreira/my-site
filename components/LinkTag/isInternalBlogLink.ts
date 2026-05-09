export function isInternalBlogLink(href: string): boolean {
  return href.startsWith("/en/blog/") || href.startsWith("/pt-br/blog/");
}
