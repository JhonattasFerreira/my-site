import getPostMetadata from "@/utils/getPostMetadata";
import LayoutPost from "@/components/LayoutPost";
import transformString from "@/utils/transformString";
import {
  CONTENT_FOLDER,
  EN_LANGUAGE,
  FILENAME_END_PT_BR,
  TITLE_METADATA_POST_SUFIX,
} from "@/utils/constants";
import getPostContent from "@/utils/getPostContent";

export const generateStaticParams = async () => {
  const posts = getPostMetadata(CONTENT_FOLDER, EN_LANGUAGE);

  return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata({ params, searchParams }) {
  return {
    title: `${transformString(params?.slug)}${TITLE_METADATA_POST_SUFIX}`,
  };
}

const Post = (props) => {
  const slug = props.params.slug;
  const { data, content, oppositeUrl } = getPostContent(
    slug,
    FILENAME_END_PT_BR
  );

  return (
    <LayoutPost
      frontmatter={data}
      content={content}
      language={EN_LANGUAGE}
      oppositeUrl={oppositeUrl}
    />
  );
};

export default Post;
