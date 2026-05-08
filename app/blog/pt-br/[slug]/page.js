import getPostMetadata from "@/utils/getPostMetadata";
import LayoutPost from "@/components/LayoutPost";
import {
  CONTENT_FOLDER,
  PT_BR_LANGUAGE,
  FILENAME_END_EN,
  TITLE_METADATA_POST_SUFIX,
} from "@/utils/constants";
import getPostContent from "@/utils/getPostContent";

export const generateStaticParams = async () => {
  const posts = getPostMetadata(CONTENT_FOLDER, PT_BR_LANGUAGE);

  return posts.map((post) => ({ slug: `${post.slug}` }));
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = getPostContent(slug, FILENAME_END_EN);
  return {
    title: `${data.title}${TITLE_METADATA_POST_SUFIX}`,
  };
}

const Post = async (props) => {
  const { slug } = await props.params;
  const { data, content, oppositeUrl } = getPostContent(slug, FILENAME_END_EN);

  return (
    <LayoutPost
      frontmatter={data}
      content={content}
      language={PT_BR_LANGUAGE}
      oppositeUrl={oppositeUrl}
    />
  );
};

export default Post;
