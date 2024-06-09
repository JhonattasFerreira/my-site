import fs from "fs";
import matter from "gray-matter";
import getPostMetadata from "@/utils/getPostMetadata";
import LayoutPost from "@/components/LayoutPost";
import transformString from "@/utils/transformString";

function getPostContent(slug) {
  const folder = "content/posts";

  const postFolders = fs.readdirSync(folder + "/");

  let filename;
  let folderName;
  let oppositeUrl;

  for (const postFolder of postFolders) {
    const files = fs.readdirSync(`${folder}/${postFolder}/`);
    filename = files.find((file) => file.includes(slug));
    if (filename) {
      folderName = postFolder;
      oppositeUrl = files.find((item) => item !== filename);
      break;
    }
  }

  const file = folder + `/${folderName}/${filename}`;

  const content = fs.readFileSync(file, "utf8");

  const matterResult = matter(content);
  return {
    data: matterResult.data,
    content: matterResult.content,
    oppositeUrl: `${oppositeUrl.replace(".pt-br.md", "")}`,
  };
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
  const { data, content, oppositeUrl } = getPostContent(slug);

  return (
    <LayoutPost
      frontmatter={data}
      content={content}
      slug={slug}
      language={"en"}
      oppositeUrl={oppositeUrl}
    />
  );
};

export default Post;
