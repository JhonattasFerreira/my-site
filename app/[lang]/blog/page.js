import getPostMetadata from "@/utils/getPostMetadata";
import ListingPost from "@/components/ListingPost";
import {
  EN_LANGUAGE,
  PT_BR_LANGUAGE,
  CONTENT_FOLDER,
  LISTING_POSTS_METADATA_EN,
  LISTING_POSTS_METADATA_PT_BR,
} from "@/utils/constants";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return lang === EN_LANGUAGE
    ? LISTING_POSTS_METADATA_EN
    : LISTING_POSTS_METADATA_PT_BR;
}

const Blog = async ({ params }) => {
  const { lang } = await params;
  const language = lang === PT_BR_LANGUAGE ? PT_BR_LANGUAGE : EN_LANGUAGE;
  const postMetadata = getPostMetadata(CONTENT_FOLDER, language);

  return <ListingPost postMetadata={postMetadata} language={language} />;
};

export default Blog;
