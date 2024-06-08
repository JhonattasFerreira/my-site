import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";
import ReactMarkdown from "react-markdown";
import PostFrontmatter from "../../../../../components/PostFrontmatter";
import Image from "../../../../../components/Image";
import CodeBlock from "../../../../../components/CodeBlock";
import { SEO } from "../../../../../components/Seo";

const Post = ({ content, frontmatter }) => {
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

export async function getStaticPaths() {
  const files = fs.readdirSync("content/posts");

  const paths = files.map((filename) => ({
    params: {
      slug: filename,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMetadata = fs
    .readFileSync(path.join("content/posts", slug, "index.pt-br.md"))
    .toString();

  const { data, content } = matter(markdownWithMetadata);

  return {
    props: {
      content,
      frontmatter: data,
    },
  };
}

export default Post;
