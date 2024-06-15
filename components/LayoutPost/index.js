import ReactMarkdown from "react-markdown";
import PostFrontmatter from "@/components/PostFrontmatter";
import Image from "@/components/Image";
import CodeBlock from "@/components/CodeBlock";
import LinkTag from "@/components/LinkTag";

const LayoutPost = ({ content, frontmatter, language, oppositeUrl }) => {
  return (
    <PostFrontmatter
      title={frontmatter.title}
      date={frontmatter.date}
      language={language}
      oppositeUrl={oppositeUrl}
    >
      <ReactMarkdown
        components={{
          code: CodeBlock,
          img: Image,
          a: LinkTag,
        }}
      >
        {content}
      </ReactMarkdown>
    </PostFrontmatter>
  );
};

export default LayoutPost;
