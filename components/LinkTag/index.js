import Link from "next/link";
import { isInternalBlogLink } from "./isInternalBlogLink";

const LinkTag = ({ href, children }) => {
  if (isInternalBlogLink(href))
    return (
      <Link aria-label={children} href={href}>
        {children}
      </Link>
    );

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default LinkTag;
