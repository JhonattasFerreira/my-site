import Link from "next/link";
import IframeP5 from "@/components/IframeP5";

const isP5js = (linkUrl) => linkUrl.includes("editor.p5js.org");

const LinkTag = ({ href, children }) => {
  const isPtBrBlog = "/blog/pt-br/";
  const isEnBlog = "/blog/en/";

  if (isP5js(href)) {
    return <IframeP5 href={href} children={children}></IframeP5>;
  } else {
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
  }
};

export default LinkTag;
