export function isInternalBlogLink(href: string): boolean {
  return (
    href.startsWith("/en/blog/") ||
    href.startsWith("/pt-br/blog/") ||
    href.startsWith("/blog/en/") ||
    href.startsWith("/blog/pt-br/")
  );
}
