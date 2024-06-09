import ReactMarkdown from "react-markdown";
import PostFrontmatter from "@/components/PostFrontmatter";
import Image from "@/components/Image";
import CodeBlock from "@/components/CodeBlock";

const LayoutPost = ({ content, frontmatter, slug, language }) => {
  return (
    <PostFrontmatter
      title={frontmatter.title}
      date={frontmatter.date}
      slug={slug}
      language={language}
    >
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
