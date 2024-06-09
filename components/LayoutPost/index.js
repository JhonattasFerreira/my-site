import ReactMarkdown from "react-markdown";
import PostFrontmatter from "../PostFrontmatter";
import Image from "../Image";
import CodeBlock from "../CodeBlock";

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
