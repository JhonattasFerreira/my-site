import getPostMetadata from "@/utils/getPostMetadata";
import ListingPost from "@/components/ListingPost";
import {
  EN_LANGUAGE,
  PT_BR_LANGUAGE,
  CONTENT_FOLDER,
  LISTING_POSTS_METADATA_EN,
  LISTING_POSTS_METADATA_PT_BR,
  BASE_URL,
} from "@/utils/constants";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const base =
    lang === EN_LANGUAGE
      ? LISTING_POSTS_METADATA_EN
      : LISTING_POSTS_METADATA_PT_BR;
  return {
    ...base,
    alternates: {
      languages: {
        en: `${BASE_URL}/en/blog`,
        "pt-BR": `${BASE_URL}/pt-br/blog`,
      },
    },
  };
}

const Blog = async ({ params }: Props) => {
  const { lang } = await params;
  const language = lang === PT_BR_LANGUAGE ? PT_BR_LANGUAGE : EN_LANGUAGE;
  const postMetadata = getPostMetadata(CONTENT_FOLDER, language);

  return <ListingPost postMetadata={postMetadata} language={language} />;
};

export default Blog;
