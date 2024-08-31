import Link from "next/link";

const LinkTag = ({ href, children }) => {
  const isPtBrBlog = "/blog/pt-br/";
  const isEnBlog = "/blog/en/";

  if (href.startsWith(isPtBrBlog) || href.startsWith(isEnBlog))
    return (
      <Link aria-label={children} href={href}>
        {children}
      </Link>
    );

  return (
    <a href={href} target="_blank">
      {children}
    </a>
  );
};

export default LinkTag;
