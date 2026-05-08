import getPostMetadata from "@/utils/getPostMetadata";
import ListingPost from "@/components/ListingPost";
import {
  PT_BR_LANGUAGE,
  CONTENT_FOLDER,
  LISTING_POSTS_METADATA_PT_BR,
} from "@/utils/constants";

export const metadata = LISTING_POSTS_METADATA_PT_BR;

const Blog = () => {
  const postMetadata = getPostMetadata(CONTENT_FOLDER, PT_BR_LANGUAGE);

  return <ListingPost postMetadata={postMetadata} language={PT_BR_LANGUAGE} />;
};

export default Blog;
