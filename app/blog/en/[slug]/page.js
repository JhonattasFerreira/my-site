import fs from "fs";
import matter from "gray-matter";
import getPostMetadata from "@/utils/getPostMetadata";
import LayoutPost from "@/components/LayoutPost";
import transformString from "@/utils/transformString";

function getPostContent(slug) {
  const folder = "content/posts";
  const file = folder + `/${slug}/index.en.md`;
  const content = fs.readFileSync(file, "utf8");

  const matterResult = matter(content);
  return matterResult;
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata("content/posts", "en");
  return posts.map((post) => ({ slug: post.slug }));
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
      language={"en"}
    />
  );
};

export default Post;
