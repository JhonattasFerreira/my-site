import LayoutPost from "../../../../components/LayoutPost";
import { getPaths, getContent } from "../../../../helpers/PostData";

const Post = ({ content, frontmatter }) => {
  return <LayoutPost frontmatter={frontmatter} content={content} />;
};

export async function getStaticPaths() {
  return getPaths();
}

export async function getStaticProps({ params: { slug } }) {
  return getContent(slug, "index.en.md");
}

export default Post;
