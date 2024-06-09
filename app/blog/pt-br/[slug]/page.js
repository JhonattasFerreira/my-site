import fs from "fs";
import matter from "gray-matter";
import getPostMetadata from "@/utils/getPostMetadata";
import transformString from "@/utils/transformString";

import LayoutPost from "@/components/LayoutPost";

function getPostContent(slug) {
  const folder = "content/posts";
  const file = folder + `/${slug}/index.pt-br.md`;
  const content = fs.readFileSync(file, "utf8");

  const matterResult = matter(content);
  return matterResult;
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata("content/posts", "pt-br");
  return posts.map((post) => ({ slug: `${post.slug}/pt-br` }));
};

export async function generateMetadata({ params, searchParams }) {
  return {
    title: `${transformString(params?.slug)} | JhoCore`,
  };
}

const Post = (props) => {
  const slug = props.params.slug;
  const { data, content } = getPostContent(slug);

  return (
    <LayoutPost
      frontmatter={data}
      content={content}
      slug={slug}
      language={"pt-br"}
    />
  );
};

export default Post;
