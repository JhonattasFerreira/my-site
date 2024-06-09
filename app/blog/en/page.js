import getPostMetadata from "@/utils/getPostMetadata";
import ListingPost from "@/components/ListingPost";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import {
  EN_LANGUAGE,
  CONTENT_FOLDER,
  LISTING_POSTS_METADATA_EN,
} from "@/utils/variables";

export const metadata = LISTING_POSTS_METADATA_EN;

const Blog = () => {
  const postMetadata = getPostMetadata(CONTENT_FOLDER, EN_LANGUAGE);

  return (
    <>
      <SpeedInsights />
      <Analytics />
      <ListingPost postMetadata={postMetadata} language={EN_LANGUAGE} />
    </>
  );
};

export default Blog;
