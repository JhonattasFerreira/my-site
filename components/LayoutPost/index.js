import ReactMarkdown from "react-markdown";
import PostFrontmatter from "../PostFrontmatter";
import Image from "../Image";
import CodeBlock from "../CodeBlock";

const LayoutPost = ({ content, frontmatter }) => {
  if (!content || !frontmatter) {
    return null;
  }
  return (
    <PostFrontmatter title={frontmatter.title} date={frontmatter.date}>
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
