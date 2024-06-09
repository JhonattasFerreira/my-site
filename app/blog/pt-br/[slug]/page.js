import getPostMetadata from "@/utils/getPostMetadata";
import LayoutPost from "@/components/LayoutPost";
import transformString from "@/utils/transformString";
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

export async function generateMetadata({ params, searchParams }) {
  return {
    title: `${transformString(params?.slug)}${TITLE_METADATA_POST_SUFIX}`,
  };
}

const Post = (props) => {
  const slug = props.params.slug;
  const { data, content, oppositeUrl } = getPostContent(slug, FILENAME_END_EN);

  return (
    <LayoutPost
      frontmatter={data}
      content={content}
      slug={slug}
      language={PT_BR_LANGUAGE}
      oppositeUrl={oppositeUrl}
    />
  );
};

export default Post;
