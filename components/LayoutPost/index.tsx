import ReactMarkdown from "react-markdown";
import PostFrontmatter from "@/components/PostFrontmatter";
import ImageBlock from "@/components/Image";
import CodeBlock from "@/components/CodeBlock";
import LinkTag from "@/components/LinkTag";
import type { Lang, PostFrontmatter as PostFrontmatterType } from "@/types";

type Props = {
  content: string;
  frontmatter: PostFrontmatterType;
  language: Lang;
  oppositeUrl: string;
};

const LayoutPost = ({ content, frontmatter, language, oppositeUrl }: Props) => {
  return (
    <PostFrontmatter
      title={frontmatter.title}
      date={frontmatter.date}
      language={language}
      oppositeUrl={oppositeUrl}
      gif={frontmatter.gif}
      altTextGif={frontmatter.altTextGif}
      description={frontmatter.description}
    >
      <ReactMarkdown
        components={{
          code: CodeBlock,
          img: ImageBlock,
          a: LinkTag,
        }}
      >
        {content}
      </ReactMarkdown>
    </PostFrontmatter>
  );
};

export default LayoutPost;
