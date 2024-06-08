import ReactMarkdown from "react-markdown";
import PostFrontmatter from "../PostFrontmatter";
import Image from "../Image";
import CodeBlock from "../CodeBlock";
import { SEO } from "../Seo";

const LayoutPost = ({ content, frontmatter }) => {
  return (
    <PostFrontmatter title={frontmatter.title} date={frontmatter.date}>
      <SEO title={frontmatter.title} />
      <ReactMarkdown
        components={{
          code: CodeBlock,
          img: Image,
        }}
      >
        {content}
      </ReactMarkdown>
    </PostFrontmatter>
  );
};

export default LayoutPost;
