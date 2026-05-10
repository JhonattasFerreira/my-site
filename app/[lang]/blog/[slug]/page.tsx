import getPostMetadata from "@/utils/post/getPostMetadata";
import LayoutPost from "@/components/LayoutPost";
import {
  CONTENT_FOLDER,
  EN_LANGUAGE,
  PT_BR_LANGUAGE,
  TITLE_METADATA_POST_SUFIX,
  BASE_URL,
  SITE_NAME,
} from "@/utils/constants";
import getPostContent from "@/utils/post/getPostContent";
import getOppositeFilenameSuffix from "@/utils/post/getOppositeFilenameSuffix";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const generateStaticParams = async () => {
  const enPosts = getPostMetadata(CONTENT_FOLDER, EN_LANGUAGE);
  const ptPosts = getPostMetadata(CONTENT_FOLDER, PT_BR_LANGUAGE);

  return [
    ...enPosts.map((post) => ({ lang: EN_LANGUAGE, slug: post.slug })),
    ...ptPosts.map((post) => ({ lang: PT_BR_LANGUAGE, slug: post.slug })),
  ];
};

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  const isEn = lang === EN_LANGUAGE;
  const language = isEn ? EN_LANGUAGE : PT_BR_LANGUAGE;
  const { data, oppositeUrl } = getPostContent(slug, getOppositeFilenameSuffix(language));
  const title = `${data.title}${TITLE_METADATA_POST_SUFIX}`;
  return {
    title,
    description: data.description,
    openGraph: {
      title,
      description: data.description,
      url: `${BASE_URL}/${lang}/blog/${slug}`,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: data.date,
    },
    alternates: {
      languages: {
        en: `${BASE_URL}/en/blog/${isEn ? slug : oppositeUrl}`,
        "pt-BR": `${BASE_URL}/pt-br/blog/${isEn ? oppositeUrl : slug}`,
      },
    },
  };
}

const Post = async ({ params }: Props) => {
  const { lang, slug } = await params;
  const isEn = lang === EN_LANGUAGE;
  const language = isEn ? EN_LANGUAGE : PT_BR_LANGUAGE;
  const filenameEnd = getOppositeFilenameSuffix(language);
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
