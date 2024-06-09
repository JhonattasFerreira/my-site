import getPostMetadata from "@/utils/getPostMetadata";
import ListingPost from "@/components/ListingPost";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const LANGUAGE = "pt-br";

export const metadata = {
  title: "Todos os Posts | JhoCore",
  description: "Um blog de Jhonattas Ferreira",
};

const Blog = () => {
  const postMetadata = getPostMetadata("content/posts", LANGUAGE);

  return (
    <>
      <SpeedInsights />
      <Analytics />
      <ListingPost postMetadata={postMetadata} language={LANGUAGE} />
    </>
  );
};

export default Blog;
