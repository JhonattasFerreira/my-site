import getPostMetadata from "@/utils/getPostMetadata";
import LayoutPost from "@/components/LayoutPost";
import {
  CONTENT_FOLDER,
  EN_LANGUAGE,
  PT_BR_LANGUAGE,
  FILENAME_END_EN,
  FILENAME_END_PT_BR,
  TITLE_METADATA_POST_SUFIX,
} from "@/utils/constants";
import getPostContent from "@/utils/getPostContent";

export const generateStaticParams = async () => {
  const enPosts = getPostMetadata(CONTENT_FOLDER, EN_LANGUAGE);
  const ptPosts = getPostMetadata(CONTENT_FOLDER, PT_BR_LANGUAGE);

  return [
    ...enPosts.map((post) => ({ lang: EN_LANGUAGE, slug: post.slug })),
    ...ptPosts.map((post) => ({ lang: PT_BR_LANGUAGE, slug: post.slug })),
  ];
};

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const filenameEnd = lang === EN_LANGUAGE ? FILENAME_END_PT_BR : FILENAME_END_EN;
  const { data } = getPostContent(slug, filenameEnd);
  return {
    title: `${data.title}${TITLE_METADATA_POST_SUFIX}`,
  };
}

const Post = async ({ params }) => {
  const { lang, slug } = await params;
  const isEn = lang === EN_LANGUAGE;
  const filenameEnd = isEn ? FILENAME_END_PT_BR : FILENAME_END_EN;
  const language = isEn ? EN_LANGUAGE : PT_BR_LANGUAGE;
  const { data, content, oppositeUrl } = getPostContent(slug, filenameEnd);

  return (
    <LayoutPost
      frontmatter={data}
      content={content}
      language={language}
      oppositeUrl={oppositeUrl}
    />
  );
};

export default Post;
