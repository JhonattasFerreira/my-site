import Link from "next/link";
import { isInternalBlogLink } from "./isInternalBlogLink";

type Props = {
  href?: string;
  children?: React.ReactNode;
};

const LinkTag = ({ href, children }: Props) => {
  if (!href) return <>{children}</>;

  if (isInternalBlogLink(href))
    return (
      <Link aria-label={String(children)} href={href}>
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
