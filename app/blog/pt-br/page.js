import getPostMetadata from "@/utils/getPostMetadata";
import ListingPost from "@/components/ListingPost";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import {
  PT_BR_LANGUAGE,
  CONTENT_FOLDER,
  LISTING_POSTS_METADATA_PT_BR,
} from "@/utils/variables";

export const metadata = LISTING_POSTS_METADATA_PT_BR;

const Blog = () => {
  const postMetadata = getPostMetadata(CONTENT_FOLDER, PT_BR_LANGUAGE);

  return (
    <>
      <SpeedInsights />
      <Analytics />
      <ListingPost postMetadata={postMetadata} language={PT_BR_LANGUAGE} />
    </>
  );
};

export default Blog;
